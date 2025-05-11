// Import modul-modul yang diperlukan
import { Express } from "express";              // Mengimpor tipe Express untuk TypeScript
import swaggerUi from "swagger-ui-express";     // Mengimpor middleware Swagger UI
import swaggerOutput from "./swagger_output.json"; // Mengimpor dokumentasi Swagger yang telah digenerate
import fs from "fs";                           // Modul sistem file untuk membaca file
import path from "path";                       // Modul path untuk menangani jalur file

// Mengekspor fungsi docs yang menerima parameter app bertipe Express
export default function docs(app: Express) {
  app.use(
    "/api/docs",                               // Rute dimana Swagger UI akan ditampilkan
    swaggerUi.serve,                          // Menyajikan aset-aset Swagger UI
    swaggerUi.setup(swaggerOutput, {          // Mengatur Swagger UI dengan dokumentasi kita
      customCss: fs.readFileSync(             // Membaca file CSS secara synchronous
        path.resolve(                         // Mendapatkan jalur absolut
          __dirname,                          // Direktori saat ini
          "../../node_modules/swagger-ui-dist/swagger-ui.css" // Jalur menuju CSS Swagger UI
        ),
        "utf-8"                              // Menentukan encoding file
      ),
    })
  );
}
