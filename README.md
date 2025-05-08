[![CI/CD con Serveo](https://github.com/RicardoTello84/reto-practico-3/actions/workflows/ci.yml/badge.svg)](https://github.com/RicardoTello84/reto-practico-3/actions/workflows/ci.yml)

# Reto API Docker CI/CD

API sencilla de notas, contenerizada con Docker, validada con ESLint y Jest, escaneada con Trivy, y automatizada con GitHub Actions.

## Uso
```bash
docker build -t reto-practico-3 .
docker run -p 3000:3000 reto-practico-3
```

## Pruebas y Lint
```bash
npm test
npm run lint
```

## Pipeline
Automático en Pull Requests con GitHub Actions: ESLint + Jest + Trivy
