<?php
$servidor = "localhost"; //SERVIDOR LOCAL
$usuario = "root";//USUARIO DEL SERVIDOR DE LA BASE DE DATOS EN PHPMYADMIM
$contrasena = "root";//CONTRASEÑA POR DEFECTO EN PHPMYADMIN
$base_datos = "db_estudiantes";//NOMBRE DE LA BASE DE DATOS EN PHPMYADMIN
$conexion = new mysqli($servidor, $usuario, $contrasena, $base_datos);//INICIALIZAMOS CON MYSQLI LA CONEXION AL SERVIDOR
//HACEMOS UN MANEJO DE ERRORES A TRAVES DE LA CONDICIONAL
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}
session_start(); //HACEMOS UNA SESION 
?>

