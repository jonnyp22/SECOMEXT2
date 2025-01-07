Introducción
Este proyecto proporciona una API RESTful para gestionar productos y categorías. La API permite realizar las siguientes operaciones:

Productos:

Crear, listar, actualizar y eliminar productos.
Cada producto tiene un nombre, precio y una categoría asociada.
Categorías:

Crear, listar, actualizar y eliminar categorías.
Cada categoría puede contener múltiples productos.
El backend está desarrollado utilizando Spring Boot y se conecta a una base de datos MySQL (aunque se puede adaptar a otros motores de bases de datos).

Tecnologías Utilizadas
Java 17 (o superior): El lenguaje de programación utilizado.
Spring Boot 2.x: El framework para desarrollar aplicaciones Java de manera rápida.
Spring Data JPA: Utilizado para gestionar la persistencia de datos de forma sencilla mediante JPA.
MySQL: Base de datos relacional utilizada para almacenar los datos.
Maven: Herramienta de construcción y gestión de dependencias para proyectos Java.
Lombok (opcional, si decides usarlo): Librería que reduce el código repetitivo en clases Java (getters, setters, etc.).
Requisitos Previos
Para ejecutar este proyecto, necesitarás tener instalados los siguientes programas en tu máquina:

Java 17 o superior: Asegúrate de tener la versión correcta de Java instalada. Puedes verificarlo con el siguiente comando:

bash
java -version
MySQL: Este proyecto utiliza MySQL para almacenar los datos. Si no tienes MySQL, puedes instalarlo o usar un contenedor de Docker para ejecutarlo fácilmente.

Maven: Asegúrate de tener Maven instalado en tu máquina para gestionar las dependencias y compilar el proyecto. Puedes verificarlo con:

bash
mvn -version
Instalación
Clonar el Repositorio
Primero, clona este repositorio a tu máquina local utilizando el siguiente comando:

bash
git clone https://github.com/  /proyecto.git
cd proyecto
Configuración de la Base de Datos
1. Configuración de la Base de Datos en MySQL
Este proyecto utiliza MySQL como base de datos. Asegúrate de tener MySQL instalado y ejecutándose. Puedes descargarlo desde aquí.

Crear la base de datos:

Conéctate a MySQL y crea una base de datos para este proyecto:

sql

CREATE DATABASE mi_base_de_datos;
Configurar la conexión en application.properties:

Abre el archivo src/main/resources/application.properties y configura la URL de conexión, el nombre de usuario y la contraseña de tu base de datos:

properties

# Configuración de la base de datos
spring.datasource.url=jdbc:mysql://localhost:3306/mi_base_de_datos
spring.datasource.username=root
spring.datasource.password=tu_contraseña

# Configuración de Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
Asegúrate de reemplazar mi_base_de_datos, root y tu_contraseña con los valores correctos de tu base de datos.

Compilar y Ejecutar el Proyecto
Compilar el proyecto con Maven:

Para compilar el proyecto, ejecuta el siguiente comando en la raíz del proyecto:

bash
./mvnw clean install
Ejecutar la aplicación:

Una vez que el proyecto esté compilado, ejecuta la aplicación con:

bash
./mvnw spring-boot:run
Esto iniciará el servidor en el puerto 8080 de forma predeterminada. Puedes cambiar el puerto si es necesario editando el archivo application.properties:

properties

server.port=8081
Configuración del Proyecto
Configuración de la Base de Datos
Asegúrate de tener configurada la conexión a la base de datos correctamente en el archivo application.properties como se explicó en la sección anterior. Este archivo contiene toda la información necesaria para conectar Spring Boot con MySQL, como la URL de la base de datos, el nombre de usuario y la contraseña.

Configuración de Hibernate
Spring Boot utiliza Hibernate para la gestión de la persistencia de datos. La propiedad spring.jpa.hibernate.ddl-auto=update indica que Hibernate debe actualizar automáticamente la base de datos cuando se inicie la aplicación (esto es útil en el desarrollo, pero en producción es recomendable usar validate o none).

La propiedad spring.jpa.show-sql=true muestra las consultas SQL generadas por Hibernate en la consola, lo cual es útil para depurar.

Uso de la API
La API permite gestionar productos y categorías. A continuación, se detallan los endpoints disponibles.

Productos
1. Listar todos los productos
Método: GET
Endpoint: /api/products
Descripción: Obtiene todos los productos.
Ejemplo de respuesta:

json
[
  {
    "id": 1,
    "name": "Producto A",
    "price": 100.00,
    "category": {
      "id": 1,
      "name": "Electrónica"
    }
  },
  {
    "id": 2,
    "name": "Producto B",
    "price": 150.00,
    "category": {
      "id": 2,
      "name": "Hogar"
    }
  }
]
2. Crear un nuevo producto
Método: POST
Endpoint: /api/products
Cuerpo: Un objeto Product en formato JSON.
Ejemplo de cuerpo de la solicitud:

json
{
  "name": "Producto A",
  "price": 100.00,
  "category": {
    "id": 1
  }
}
Descripción: Crea un nuevo producto en la base de datos.
3. Actualizar un producto existente
Método: PUT
Endpoint: /api/products/{id}
Descripción: Actualiza un producto con el ID especificado.
4. Eliminar un producto
Método: DELETE
Endpoint: /api/products/{id}
Descripción: Elimina un producto con el ID especificado.
Categorías
1. Listar todas las categorías
Método: GET
Endpoint: /api/categories
Descripción: Obtiene todas las categorías.
2. Crear una nueva categoría
Método: POST
Endpoint: /api/categories
Cuerpo: Un objeto Category en formato JSON.
Ejemplo de cuerpo de la solicitud:

json

{
  "name": "Electrónica"
}
Descripción: Crea una nueva categoría en la base de datos.
3. Actualizar una categoría existente
Método: PUT
Endpoint: /api/categories/{id}
Descripción: Actualiza una categoría con el ID especificado.
4. Eliminar una categoría
Método: DELETE
Endpoint: /api/categories/{id}
Descripción: Elimina una categoría con el ID especificado.
Pruebas
Para probar los endpoints de la API, puedes usar herramientas como Postman, Insomnia o cURL. Aquí te dejo algunos ejemplos de cómo realizar las peticiones:

GET a http://localhost:8080/api/products para obtener todos los productos.
POST a http://localhost:8080/api/products con el cuerpo JSON de un nuevo producto.
PUT a http://localhost:8080/api/products/{id} con el cuerpo JSON para actualizar un producto.
DELETE a http://localhost:8080/api/products/{id} para eliminar un producto.
Estructura del Proimport { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model'; // Modelo de Producto

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/products'; // URL de la API para productos

  constructor(private http: HttpClient) { }

  // Obtener todos los productos
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Obtener un producto por ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo producto
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  // Actualizar un producto existente
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }

  // Eliminar un producto por ID
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

Estructura del Proyecto
La estructura del proyecto es la siguiente:

src/
├── main/
│   ├── java/com/tuempresa/proyecto/
│   │   ├── controllers/   # Controladores REST
│   │   ├── models/        # Entidades JPA
│   │   ├── repositories/  # Interfaces para acceso a datos
│   │   ├── services/      # Lógica de negocio
│   │   └── ProyectoApplication.java  # Clase principal
│   ├── resources/
│       └── application.properties  # Configuración del proyecto
Contribuciones
Si deseas contribuir al proyecto, sigue estos pasos:

Haz un fork del repositorio.
Crea una nueva rama para tus cambios:
bash
Copiar código
git checkout -b feature/nueva-funcionalidad
Realiza tus cambios y haz commit de los mismos.
Envía un pull request explicando los cambios realizados.

Este proyecto es una API RESTful construida con Spring Boot, que permite gestionar productos y categorías. La API se comunica con una base de datos MySQL para almacenar la información de los productos y las categorías.

La aplicación proporciona operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para ambas entidades (productos y categorías).

Componentes Principales
Spring Boot: Es el marco de trabajo que simplifica la creación de aplicaciones Java. Spring Boot maneja la configuración del proyecto, la ejecución del servidor y la gestión de las dependencias.

MySQL: Es el sistema de base de datos donde se almacenan los productos y las categorías. La base de datos se conecta con la aplicación mediante JPA (Java Persistence API), que permite interactuar con la base de datos de manera sencilla.

Maven: Es una herramienta para gestionar dependencias y construir el proyecto. Se utiliza para compilar el código, descargar bibliotecas necesarias y empaquetar la aplicación.

Estructura del Proyecto
Controladores (Controllers): Son las clases que manejan las solicitudes HTTP. Cuando un usuario realiza una solicitud a la API (por ejemplo, para obtener la lista de productos o agregar una nueva categoría), el controlador es el que procesa esa solicitud y devuelve la respuesta adecuada.

Modelos (Models): Son las clases que representan las entidades del sistema, como los productos y las categorías. Cada modelo tiene propiedades que corresponden a las columnas de las tablas en la base de datos.

Repositorios (Repositories): Son las interfaces que gestionan las operaciones de la base de datos, como insertar, actualizar, eliminar o buscar datos. Spring Data JPA se encarga de implementar estas interfaces automáticamente.

Servicios (Services): Contienen la lógica de negocio. Los servicios reciben las solicitudes de los controladores y utilizan los repositorios para interactuar con la base de datos. También pueden realizar otras tareas de procesamiento, como validaciones o cálculos.

Flujo de Funcionamiento
Base de Datos:

Productos: Cada producto tiene propiedades como nombre, precio y una referencia a una categoría. Los productos están almacenados en una tabla de la base de datos llamada products.
Categorías: Las categorías contienen un nombre y se almacenan en una tabla llamada categories. Cada producto pertenece a una categoría.
Controlador:

El controlador recibe las solicitudes HTTP de los clientes (por ejemplo, cuando un cliente quiere obtener todos los productos o crear un nuevo producto).
Luego, el controlador llama al servicio correspondiente para procesar la solicitud.
Servicio:

El servicio realiza las operaciones necesarias utilizando los repositorios. Por ejemplo, si el cliente quiere crear un nuevo producto, el servicio valida los datos y luego guarda el producto en la base de datos.
Repositorio:

El repositorio interactúa directamente con la base de datos. Por ejemplo, si un servicio solicita todos los productos, el repositorio hace una consulta a la base de datos para obtener los productos y los devuelve al servicio.
Respuesta:

Finalmente, el controlador envía la respuesta al cliente, ya sea una lista de productos, un mensaje de éxito o un error.
Endpoints de la API
La API proporciona los siguientes endpoints para interactuar con los productos y las categorías:

Productos
GET /api/products: Obtiene la lista de todos los productos.
POST /api/products: Crea un nuevo producto.
PUT /api/products/{id}: Actualiza un producto existente.
DELETE /api/products/{id}: Elimina un producto.
Categorías
GET /api/categories: Obtiene la lista de todas las categorías.
POST /api/categories: Crea una nueva categoría.
PUT /api/categories/{id}: Actualiza una categoría existente.
DELETE /api/categories/{id}: Elimina una categoría.
Cómo Funciona el Flujo de una Solicitud
Solicitud del Cliente: Un cliente (por ejemplo, un navegador web o una aplicación frontend) realiza una solicitud HTTP al backend, como GET /api/products para obtener la lista de productos.

Controlador: El controlador recibe la solicitud y pasa los datos al servicio correspondiente.

Servicio: El servicio procesa la solicitud. Si es necesario, el servicio interactúa con la base de datos a través del repositorio.

Repositorio: El repositorio consulta la base de datos y devuelve los datos al servicio.

Respuesta al Cliente: El servicio devuelve los datos procesados al controlador, que luego responde al cliente con los resultados de la operación.

Conexión con la Base de Datos
El proyecto utiliza JPA (Java Persistence API) para interactuar con la base de datos. Spring Boot maneja automáticamente la configuración de la base de datos, la creación de las tablas y la conversión de las entidades en registros de base de datos.

¿Cómo Ejecutar el Proyecto?
Configura la base de datos: Crea una base de datos llamada gestion_productos en MySQL.
Configura la conexión: Asegúrate de que los parámetros de conexión a la base de datos estén correctos en el archivo application.properties.
Compila y ejecuta: Usa Maven para compilar y ejecutar el proyecto. La API estará disponible en http://localhost:8080.
Resumen
Este proyecto es una API RESTful que gestiona productos y categorías. Utiliza Spring Boot para la parte del backend y MySQL para la base de datos. La estructura del proyecto está organizada en controladores, servicios, repositorios y modelos, que trabajan juntos para ofrecer una API funcional que puede ser consumida por una aplicación frontend.

La API permite crear, leer, actualizar y eliminar productos y categorías, lo que facilita la gestión de un inventario de productos en una tienda, por ejemplo.
