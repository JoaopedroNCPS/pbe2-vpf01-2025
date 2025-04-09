const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const create = async (req, res) => {
    try {
        const { nome, descricao, valor } = req.body;

        const pizza = await prisma.pizza.create({
            data: {
                nome,
                descricao,
                valor
            }
        });

        res.status(201).json(pizza).end();
    } catch (e) {
        res.status(400).json({ error: e.message }).end();
    }
};


const read = async (req, res) => {
    try {
        const pizzas = await prisma.pizza.findMany();
        res.status(200).json(pizzas).end();
    } catch (e) {
        res.status(400).json({ error: e.message }).end();
    }
};


const update = async (req, res) => {
    try {
        const pizza = await prisma.pizza.update({
            where: {
                id: Number(req.params.id)
            },
            data: req.body
        });

        res.status(202).json(pizza).end();
    } catch (e) {
        res.status(400).json({ error: e.message }).end();
    }
};


const remove = async (req, res) => {
    try {
        await prisma.pizza.delete({
            where: {
                id: Number(req.params.id)
            }
        });

        res.status(204).end();
    } catch (e) {
        res.status(400).json({ error: e.message }).end();
    }
};

module.exports = {
    create,
    read,
    update,
    remove
};