/**
 * Nativo Link - Backend inicial (Node.js + Express + SQLite)
 *
 * Este servidor implementa:
 * - Conexión a base de datos relacional SQLite (archivo local ./nativo_link.db)
 * - Creación automática de tablas (usuarios y productos)
 * - Endpoints base para registro de usuarios y gestión de catálogo de productos
 *
 * Nota: La contraseña está simulada (texto plano) para esta primera etapa.
 * En producción, usar bcrypt + JWT + validaciones avanzadas.
 */

const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares base
app.use(cors());
app.use(express.json());

// Ubicación del archivo de base de datos local
const dbPath = path.join(__dirname, "nativo_link.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error conectando con SQLite:", err.message);
  } else {
    console.log(`Base de datos conectada: ${dbPath}`);
  }
});

/**
 * Inicialización de esquema (tablas)
 * - usuarios: rol = 'artesano' o 'consumidor'
 * - productos: referencia al artesano creador (artesano_id)
 */
db.serialize(() => {
  db.run("PRAGMA foreign_keys = ON;");

  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      rol TEXT NOT NULL CHECK (rol IN ('artesano', 'consumidor')),
      creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS productos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descripcion TEXT NOT NULL,
      precio REAL NOT NULL CHECK (precio >= 0),
      stock INTEGER NOT NULL CHECK (stock >= 0),
      artesano_id INTEGER NOT NULL,
      creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (artesano_id) REFERENCES usuarios(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
    );
  `);
});

/**
 * Helper para respuestas de error consistentes.
 */
function sendBadRequest(res, message) {
  return res.status(400).json({ ok: false, error: message });
}

/**
 * POST /api/usuarios/registro
 * Registra un nuevo usuario.
 * Body esperado:
 * {
 *   "nombre": "Laura Quispe",
 *   "email": "laura@mail.com",
 *   "password": "12345678",
 *   "rol": "artesano" // o "consumidor"
 * }
 */
app.post("/api/usuarios/registro", (req, res) => {
  const { nombre, email, password, rol } = req.body;

  if (!nombre || !email || !password || !rol) {
    return sendBadRequest(res, "Faltan campos requeridos: nombre, email, password, rol.");
  }

  if (!["artesano", "consumidor"].includes(rol)) {
    return sendBadRequest(res, "El rol debe ser 'artesano' o 'consumidor'.");
  }

  const sql = `
    INSERT INTO usuarios (nombre, email, password, rol)
    VALUES (?, ?, ?, ?)
  `;

  db.run(sql, [nombre.trim(), email.trim().toLowerCase(), password, rol], function onInsert(err) {
    if (err) {
      if (err.message.includes("UNIQUE constraint failed: usuarios.email")) {
        return res.status(409).json({ ok: false, error: "El email ya está registrado." });
      }
      console.error("Error registrando usuario:", err.message);
      return res.status(500).json({ ok: false, error: "Error interno del servidor." });
    }

    return res.status(201).json({
      ok: true,
      data: {
        id: this.lastID,
        nombre,
        email: email.trim().toLowerCase(),
        rol,
      },
    });
  });
});

/**
 * POST /api/productos
 * Publica un producto nuevo (solo artesanos).
 * Body esperado:
 * {
 *   "titulo": "Blusa de algodón nativo",
 *   "descripcion": "Hecho a mano",
 *   "precio": 189.90,
 *   "stock": 10,
 *   "artesano_id": 1
 * }
 */
app.post("/api/productos", (req, res) => {
  const { titulo, descripcion, precio, stock, artesano_id } = req.body;

  if (!titulo || !descripcion || precio === undefined || stock === undefined || !artesano_id) {
    return sendBadRequest(res, "Faltan campos requeridos: titulo, descripcion, precio, stock, artesano_id.");
  }

  if (Number(precio) < 0 || Number(stock) < 0) {
    return sendBadRequest(res, "Precio y stock deben ser valores no negativos.");
  }

  // Validar que el usuario exista y sea artesano
  db.get("SELECT id, rol FROM usuarios WHERE id = ?", [artesano_id], (userErr, userRow) => {
    if (userErr) {
      console.error("Error validando artesano:", userErr.message);
      return res.status(500).json({ ok: false, error: "Error interno del servidor." });
    }

    if (!userRow) {
      return res.status(404).json({ ok: false, error: "No existe el usuario artesano indicado." });
    }

    if (userRow.rol !== "artesano") {
      return sendBadRequest(res, "Solo usuarios con rol 'artesano' pueden publicar productos.");
    }

    const sql = `
      INSERT INTO productos (titulo, descripcion, precio, stock, artesano_id)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.run(sql, [titulo.trim(), descripcion.trim(), Number(precio), Number(stock), artesano_id], function onInsert(err) {
      if (err) {
        console.error("Error creando producto:", err.message);
        return res.status(500).json({ ok: false, error: "Error interno del servidor." });
      }

      return res.status(201).json({
        ok: true,
        data: {
          id: this.lastID,
          titulo,
          descripcion,
          precio: Number(precio),
          stock: Number(stock),
          artesano_id,
        },
      });
    });
  });
});

/**
 * GET /api/productos
 * Lista catálogo de productos disponibles para frontend.
 * Incluye información básica del artesano creador.
 */
app.get("/api/productos", (_req, res) => {
  const sql = `
    SELECT
      p.id,
      p.titulo,
      p.descripcion,
      p.precio,
      p.stock,
      p.artesano_id,
      u.nombre AS artesano_nombre,
      u.email AS artesano_email
    FROM productos p
    INNER JOIN usuarios u ON p.artesano_id = u.id
    ORDER BY p.creado_en DESC;
  `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("Error listando productos:", err.message);
      return res.status(500).json({ ok: false, error: "Error interno del servidor." });
    }

    return res.json({ ok: true, data: rows });
  });
});

// Health-check simple
app.get("/health", (_req, res) => {
  res.json({ ok: true, message: "Nativo Link API activa" });
});

app.listen(PORT, () => {
  console.log(`Servidor backend ejecutándose en http://localhost:${PORT}`);
});
