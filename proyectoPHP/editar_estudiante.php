    <!-- CODIGO HEADER EN HTML -->
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
             <!-- USAMOS CODIGO PHP PARA CONDICIONAR EL INICIO DE SESION A TRAVES DEL USUARIO EN EL MENU PARA VOLVER AL INICIO Y CERRAR SESION-->
            <?php if (isset($_SESSION['usuario'])): ?>
              <li class="nav-item"><a class="nav-link" href="listar_estudiantes.php">Inicio</a></li>
              <li class="nav-item"><a class="nav-link" href="logout.php">Cerrar sesión</a></li>
            <!-- USAMOS CODIGO PHP PARA EL INICIO DE SESION A TRAVES DEL MENU-->
            <?php else: ?>
              <li class="nav-item"><a class="nav-link" href="login.php">Iniciar sesión</a></li>
              <li class="nav-item"><a class="nav-link" href="registro_usuario.php">Registrarse</a></li>
              <!-- USAMOS CODIGO PHP PARA EL MENU-->
            <?php endif; ?>
          </ul>
        </div>
      </div>
    </nav>
        <!-- CODIGO EN PHP PARA MANDAR A LLAMAR LA CONEXION POR MEDIO DE UNA SESION -->
      <?php
      include("conexion.php");//APLICAMOS HERENCIA DE DATOS
      //CREAMOS UNA SESION A TRAVES DEL USUARIO Y EL LOGUEO
      if (!isset($_SESSION['usuario'])) {
          header("Location: login.php");
          exit;
      }
      $id = $_GET['id'];
      $resultado = $conexion->query("SELECT * FROM estudiantes WHERE id=$id");
      $estudiante = $resultado->fetch_assoc();

      if (isset($_POST['actualizar'])) {
          $nombre = $_POST['nombre'];
          $apellido = $_POST['apellido'];
          $correo = $_POST['correo'];
          $edad = $_POST['edad'];

          $conexion->query("UPDATE estudiantes SET nombre='$nombre', apellido='$apellido', correo='$correo', edad='$edad' WHERE id=$id");
          header("Location: listar_estudiantes.php");
          exit;
      }
      ?>
<h2>Editar Estudiante</h2>
  <form method="POST" class="card p-4">
      <div class="mb-3">
        <label>Nombre</label>
        <input type="text" name="nombre" class="form-control" value="<?= $estudiante['nombre'] ?>" required>
      </div>
      <div class="mb-3">
        <label>Apellido</label>
        <input type="text" name="apellido" class="form-control" value="<?= $estudiante['apellido'] ?>" required>
      </div>
      <div class="mb-3">
        <label>Correo</label>
        <input type="email" name="correo" class="form-control" value="<?= $estudiante['correo'] ?>" required>
      </div>
      <div class="mb-3">
        <label>Edad</label>
        <input type="number" name="edad" class="form-control" value="<?= $estudiante['edad'] ?>" required>
      </div>
    <button type="submit" name="actualizar" class="btn btn-primary">Actualizar</button>
  </form>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>

