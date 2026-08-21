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
$resultado = $conexion->query("SELECT * FROM estudiantes");
?>
<h2 class="mb-4">Lista de Estudiantes</h2>
<a href="registro.php" class="btn btn-primary mb-3">Registrar Estudiante</a>

<table class="table table-bordered table-striped">
  <thead class="table-dark">
    <tr>
      <th>ID</th>
      <th>Nombre</th>
      <th>Apellido</th>
      <th>Correo</th>
      <th>Edad</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    <?php while($fila = $resultado->fetch_assoc()): ?>
    <tr>
      <td><?= $fila['id'] ?></td>
      <td><?= $fila['nombre'] ?></td>
      <td><?= $fila['apellido'] ?></td>
      <td><?= $fila['correo'] ?></td>
      <td><?= $fila['edad'] ?></td>
      <td>
        <a href="editar_estudiante.php?id=<?= $fila['id'] ?>" class="btn btn-warning btn-sm">Editar</a>
        <a href="eliminar_estudiante.php?id=<?= $fila['id'] ?>" class="btn btn-danger btn-sm" onclick="return confirm('¿Seguro que deseas eliminar este registro?');">Eliminar</a>
      </td>
    </tr>
    <?php endwhile; ?>
  </tbody>
</table>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
