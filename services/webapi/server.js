// webapi/server.js
const express = require('express');
const client = require('prom-client'); // Для метрик Prometheus
const mqtt = require('mqtt');
const morgan = require('morgan'); // Логування

const app = express();
const port = 3000;

// Логування запитів
app.use(morgan('combined'));

// MQTT Клієнт
const mqttClient = mqtt.connect('mqtt://mqtt-broker:1883');

mqttClient.on('connect', () => {
    console.log('Connected to MQTT Broker');
    // Публікація статусу WebAPI при запуску
    mqttClient.publish('service/webapi/status', 'online', { retain: true });
});

// Метрики Prometheus
const register = new client.Registry();
client.collectDefaultMetrics({ register });

app.get('/health', (req, res) => {
    res.json({ status: 'UP', service: 'WebAPI' });
});

app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

app.listen(port, () => {
    console.log(`WebAPI listening at http://localhost:${port}`);
});