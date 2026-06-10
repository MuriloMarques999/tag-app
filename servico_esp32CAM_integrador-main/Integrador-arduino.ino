#include "esp_camera.h"
#include <WiFi.h>
#include <HTTPClient.h>
#include "base64.h"

// ==========================
// WIFI
// ==========================
const char* ssid = "ANDRADE1";
const char* password = "Jovit2004";

// ==========================
// BACKEND
// ==========================
const char* serverUrl = "http://192.168.15.10:3000/scan-image";

unsigned long lastSendMillis = 0;
const unsigned long SEND_INTERVAL_MS = 2500;

// ==========================
// CAMERA PINS AI THINKER
// ==========================
#define PWDN_GPIO_NUM     32
#define RESET_GPIO_NUM    -1
#define XCLK_GPIO_NUM      0
#define SIOD_GPIO_NUM     26
#define SIOC_GPIO_NUM     27

#define Y9_GPIO_NUM       35
#define Y8_GPIO_NUM       34
#define Y7_GPIO_NUM       39
#define Y6_GPIO_NUM       36
#define Y5_GPIO_NUM       21
#define Y4_GPIO_NUM       19
#define Y3_GPIO_NUM       18
#define Y2_GPIO_NUM        5
#define VSYNC_GPIO_NUM    25
#define HREF_GPIO_NUM     23
#define PCLK_GPIO_NUM     22

// ==========================
// INICIAR CAMERA
// ==========================
void startCamera() {

  camera_config_t config;

  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;

  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;

  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;

  config.pin_sscb_sda = SIOD_GPIO_NUM;
  config.pin_sscb_scl = SIOC_GPIO_NUM;

  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;

  config.xclk_freq_hz = 20000000;

  config.pixel_format = PIXFORMAT_JPEG;

  // resolução maior para melhorar a leitura do QR Code
  config.frame_size = FRAMESIZE_QVGA;

  config.jpeg_quality = 12;

  config.fb_count = 1;

  esp_err_t err = esp_camera_init(&config);

  if (err != ESP_OK) {
    Serial.println("Erro ao iniciar camera");
    return;
  }

  Serial.println("Camera iniciada");
}

// ==========================
// WIFI
// ==========================
void connectWiFi() {

  WiFi.begin(ssid, password);

  Serial.print("Conectando WiFi");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi conectado");
  Serial.println(WiFi.localIP());
}

// ==========================
// ENVIAR FOTO
// ==========================
void sendPhoto() {

  camera_fb_t * fb = esp_camera_fb_get();

  if (!fb) {
    Serial.println("Erro ao capturar imagem");
    return;
  }

  Serial.println("Imagem capturada");

  // converter pra base64
  String imageBase64 = base64::encode(fb->buf, fb->len);

  HTTPClient http;

  http.begin(serverUrl);

  http.addHeader("Content-Type", "application/json");

  String body = "{\"image\":\"" + imageBase64 + "\"}";

  int httpResponseCode = http.POST(body);

  Serial.print("HTTP Response: ");
  Serial.println(httpResponseCode);

  String response = http.getString();

  Serial.println(response);

  http.end();

  esp_camera_fb_return(fb);
}

// ==========================
// SETUP
// ==========================
void setup() {

  Serial.begin(115200);

  startCamera();

  connectWiFi();

  delay(3000);

  lastSendMillis = millis();
}

// ==========================
// LOOP
// ==========================
void loop() {
  if (WiFi.status() != WL_CONNECTED) {
    connectWiFi();
  }

  if (millis() - lastSendMillis >= SEND_INTERVAL_MS) {
    sendPhoto();
    lastSendMillis = millis();
  }
}