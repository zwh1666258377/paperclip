import express from 'express';

export function test(app: ReturnType<typeof express>) {
  app.get('/api/test', async (req, res) => {
    res.json({
      test:"hello"
    });
  });
}
