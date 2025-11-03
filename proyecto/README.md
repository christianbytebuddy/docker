#  Informe Técnico: Introducción y Uso de Docker

##  Resumen General

Este informe se basa en el análisis de dos videos tutoriales sobre **Docker**, una herramienta esencial para el desarrollo moderno, DevOps y la gestión de infraestructura.
Ambos videos explican los conceptos fundamentales de contenedores, imágenes, redes, volúmenes y la automatización mediante **Docker Compose**.
A continuación se detallan los puntos aprendidos, reflexiones personales y un ejemplo práctico.

---

##  1. Resumen del primer video

El primer video presenta **Docker** como una tecnología que permite empaquetar aplicaciones junto con todas sus dependencias dentro de contenedores, garantizando que se ejecuten igual en cualquier entorno.
Se abordan temas como:

* Diferencias entre máquinas virtuales y contenedores.
* Conceptos de **imágenes, contenedores y Docker Hub**.
* Uso de comandos básicos: `docker pull`, `docker run`, `docker ps`, `docker stop`, `docker rm`.
* Ejemplo práctico con una aplicación **Node.js y MongoDB**, donde se usa `docker-compose.yml` para coordinar ambos servicios.
* Explicación de **volúmenes** para persistir datos y **port mapping** para comunicar contenedores con el host.

**Conclusión:** Docker simplifica el desarrollo, mejora la portabilidad y elimina los típicos errores de “funciona en mi máquina”.

---

##  2. Resumen del segundo video

El segundo video amplía el enfoque práctico, explicando cómo construir imágenes personalizadas con un **Dockerfile**, buenas prácticas como **usar versiones fijas** en las imágenes base y cómo aprovechar el sistema de **capas y caché** de Docker.
También enseña a:

* Crear redes personalizadas entre contenedores.
* Usar variables de entorno y volúmenes para datos persistentes.
* Ejecutar herramientas dentro de contenedores (como un cliente MySQL).
* Organizar entornos de desarrollo y producción mediante **Docker Compose**.

**Conclusión:** Comprender las imágenes, redes, volúmenes y Compose permite manejar proyectos más complejos y reproducibles.

---

##  Reflexiones personales

**Ventajas:**

* Facilita la configuración de entornos idénticos para todo el equipo.
* Evita conflictos de versiones de dependencias.
* Acelera despliegues y pruebas al automatizar la infraestructura.

**Desafíos:**

* Requiere entender conceptos nuevos (imágenes, redes, volúmenes).
* El consumo de recursos puede ser alto si se abren muchos contenedores.

**Uso práctico:**
Aplicaría Docker para desarrollar aplicaciones web con base de datos, sin tener que instalar MySQL o Node.js localmente, y poder ejecutar todo con un solo comando.

---

##  Ejemplo práctico

**Objetivo:** Ejecutar una aplicación Node.js que se conecte a una base de datos MongoDB usando `docker-compose`.

**Estructura del proyecto:**

```
docker-tutorial-report/
│
├─ docker-compose.yml
├─ app/
│   ├─ Dockerfile
│   ├─ package.json
│   └─ index.js
```

**docker-compose.yml**

```yaml
version: "3.9"
services:
  app:
    build: ./app
    ports:
      - "3000:3000"
    depends_on:
      - mongo
  mongo:
    image: mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
volumes:
  mongo_data:
```

**app/Dockerfile**

```dockerfile
FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
```

**index.js (ejemplo simple)**

```js
const express = require("express");
const app = express();
app.get("/", (req, res) => res.send("¡Hola desde Docker + Node.js!"));
app.listen(3000, () => console.log("Servidor corriendo en puerto 3000"));
```

Luego, se ejecuta:

```bash
docker compose up --build
```

Y la aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

---

##  Recursos adicionales

*  [Documentación oficial de Docker](https://docs.docker.com/)
*  [Repositorio oficial de Docker Hub](https://hub.docker.com/)
*  [Guía de Docker Compose](https://docs.docker.com/compose/)
*  [Curso oficial de Docker en YouTube (Docker Inc.)](https://www.youtube.com/@Docker)

---