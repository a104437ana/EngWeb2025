var express = require('express');
var router = express.Router();
var multer = require('multer')
var File = require('../controllers/file')
var path = require('path');
var Auth = require('../auth/auth')
var fs = require('fs');

function now() {
  return new Date().toLocaleString('pt-PT', { hour12: false });
}

router.get('/:id', Auth.validateGetFile, async function(req, res, next) {
  const file = await File.findById(req.params.id);
  if (!file) return res.status(404).send('Ficheiro não encontrado');
  const filePath = path.resolve(file.path);
  res.sendFile(filePath);
});

async function replaceFile(filePath, fileBuffer, name) {
  if (fs.existsSync(filePath)) {
    await fs.promises.unlink(filePath);
  }
  const ext = path.extname(name).toLowerCase();
  if (['.apng', '.gif', '.ico', '.cur', '.png', '.jpeg', '.jpg', '.jfif', '.pjpeg', '.pjp', '.svg'].includes(ext)) {
    type = 'image';
  } else if (ext === '.pdf') {
    type = 'pdf';
  } else if (ext === '.txt') {
    type = 'text';
  } else {
    type = 'other';
  }
  const baseWithoutExt = filePath.replace(/\.[^/.]+$/, '');
  const newFilePath = `${baseWithoutExt}${ext}`;
  await fs.promises.writeFile(newFilePath, fileBuffer);
  return {
    'path': newFilePath,
    'type': type
  };
}

router.put('/:id', Auth.validateChangeFile, multer().single('file'), async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;
    const originalName = req.file.originalname;
    const file = await File.findById(req.params.id);
    const newInfo = await replaceFile(file.path, fileBuffer, originalName);
    File.updateInfo(req.params.id, newInfo);
    res.status(200).json({ message: 'Ficheiro atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
