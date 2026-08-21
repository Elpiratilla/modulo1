<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Gestión de Estudiantes</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
<nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
  <div class="container">
    <a class="navbar-brand" href="listar_estudiantes.php">Sistema Estudiantes</a>
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav ms-auto">
        <?php if (isset($_SESSION['usuario'])): ?>
          <li class="nav-item"><a class="nav-link" href="listar_estudiantes.php">Inicio</a></li>
          <li class="nav-item"><a class="nav-link" href="logout.php">Cerrar sesión</a></li>
        <?php else: ?>
          <li class="nav-item"><a class="nav-link" href="login.php">Iniciar sesión</a></li>
          <li class="nav-item"><a class="nav-link" href="registro_usuario.php">Registrarse</a></li>
        <?php endif; ?>
      </ul>
    </div>
  </div>
</nav>
<?php
include("conexion.php");
if (!isset($_SESSION['usuario'])) {
    header("Location: login.php");
    exit;
}
?>
<h2>Registrar Estudiante</h2>
<form action="guardar_estudiante.php" method="POST" class="card p-4">
  <div class="mb-3">
    <label>Nombre</label>
    <input type="text" name="nombre" class="form-control" required>
  </div>
  <div class="mb-3">
    <label>Apellido</label>
    <input type="text" name="apellido" class="form-control" required>
  </div>
  <div class="mb-3">
    <label>Correo</label>
    <input type="email" name="correo" class="form-control" required>
  </div>
  <div class="mb-3">
    <label>Edad</label>
    <input type="number" name="edad" class="form-control" required>
  </div>
  <button type="submit" class="btn btn-success">Guardar</button>
</form>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
