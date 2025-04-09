const express = require('express');
const router = express.Router();

const Cliente = require('./controllers/cliente');
const Pedido = require('./controllers/pedido');
const Pizza = require('./controllers/pizza');


router.get('/', (req, res) => {
    res.json({ titulo: 'Pizzaria Ginno e Silva' });
});


router.post('/cliente', Cliente.create);
router.get('/cliente', Cliente.read);
router.patch('/cliente/:id', Cliente.update);
router.delete('/cliente/:id', Cliente.remove);


router.post('/pedidos', Pedido.create);
router.get('/pedidos', Pedido.read);
router.patch('/pedidos/:id', Pedido.update);
router.delete('/pedidos/:id', Pedido.remove);
router.get('/pedidos/:id', Pedido.readOne);

router.post('/pizza', Pizza.create);
router.get('/pizza', Pizza.read);
router.patch('/pizza/:id', Pizza.update);
router.delete('/pizza/:id', Pizza.remove);

module.exports = router;