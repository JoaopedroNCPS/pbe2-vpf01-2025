const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const create = async (req, res) => {
    try {
        const { clienteId, hora, itens } = req.body;

        const valorTotal = itens.reduce((acc, item) => acc + (item.valor * item.quantidade), 0);

        const pedido = await prisma.pedido.create({
            data: {
                clienteId,
                hora: new Date(hora),
                valor: valorTotal,
                itens: {
                    create: itens.map(item => ({
                        pizzaId: item.pizzaId,
                        quantidade: item.quantidade,
                        valor: item.valor,
                        subtotal: item.valor * item.quantidade
                    }))
                }
            },
            include: {
                itens: true
            }
        });

        res.status(201).json(pedido).end();
    } catch (e) {
        res.status(400).json({ error: e.message }).end();
    }
};


const read = async (req, res) => {
    try {
        const pedidos = await prisma.pedido.findMany({
            include: {
                cliente: true,
                itens: {
                    include: {
                        pizza: true
                    }
                }
            }
        });
        res.status(200).json(pedidos).end();
    } catch (e) {
        res.status(400).json({ error: e.message }).end();
    }
};


const update = async (req, res) => {
    try {
        const { hora, itens } = req.body;

        const valorTotal = itens.reduce((acc, item) => acc + (item.valor * item.quantidade), 0);


        await prisma.itemPedido.deleteMany({
            where: {
                pedidoId: Number(req.params.id)
            }
        });


        const pedido = await prisma.pedido.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                hora: new Date(hora),
                valor: valorTotal,
                itens: {
                    create: itens.map(item => ({
                        pizzaId: item.pizzaId,
                        quantidade: item.quantidade,
                        valor: item.valor,
                        subtotal: item.valor * item.quantidade
                    }))
                }
            },
            include: {
                itens: true
            }
        });

        res.status(202).json(pedido).end();
    } catch (e) {
        res.status(400).json({ error: e.message }).end();
    }
};


const remove = async (req, res) => {
    try {
        await prisma.itemPedido.deleteMany({
            where: {
                pedidoId: Number(req.params.id)
            }
        });

        await prisma.pedido.delete({
            where: {
                id: Number(req.params.id)
            }
        });

        res.status(204).end();
    } catch (e) {
        res.status(400).json({ error: e.message }).end();
    }
};

const readOne = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const pedido = await prisma.pedido.findUnique({
            where: { id },
            include: {
                cliente: true,
                itens: {
                    include: {
                        pizza: true
                    }
                }
            }
        });

        if (!pedido) {
            return res.status(404).json({ error: "Pedido não encontrado" }).end();
        }

        res.json(pedido).end();
    } catch (e) {
        res.status(400).json(e).end();
    }
};

module.exports = {
    create,
    read,
    update,
    remove,
    readOne
};