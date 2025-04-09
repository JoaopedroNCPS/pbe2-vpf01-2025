const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const create = async (req, res) => {
    try {
        const cliente = await prisma.cliente.create({
            data: {
                nome: req.body.nome,
                logradouro: req.body.logradouro,
                numero: req.body.numero,
                bairro: req.body.bairro,
                referencia: req.body.referencia,
                telefones: {
                    create: req.body.telefones 
                }
            },
            include: {
                telefones: true
            }
        });
        res.status(201).json(cliente).end();
    } catch (e) {
        res.status(400).json({ error: e.message }).end();
    }
};


const read = async (req, res) => {
    try {
        const clientes = await prisma.cliente.findMany({
            include: {
                telefones: true,
                pedidos: true
            }
        });
        res.status(200).json(clientes).end();
    } catch (e) {
        res.status(400).json({ error: e.message }).end();
    }
};


const update = async (req, res) => {
    try {
        const cliente = await prisma.cliente.update({
            where: { id: Number(req.params.id) },
            data: {
                nome: req.body.nome,
                logradouro: req.body.logradouro,
                numero: req.body.numero,
                bairro: req.body.bairro,
                referencia: req.body.referencia
            }
        });
        res.status(202).json(cliente).end();
    } catch (e) {
        res.status(400).json({ error: e.message }).end();
    }
};

const remove = async (req, res) => {
    try {
        const clienteId = Number(req.params.id);


        await prisma.telefone.deleteMany({
            where: { clienteId }
        });

   
        await prisma.pedido.deleteMany({
            where: { clienteId }
        });

 
        await prisma.cliente.delete({
            where: { id: clienteId }
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
