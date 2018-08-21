const HTTPstatus = require('http-status');
const repository = require('../repositories/team.repository');

exports.get = async (req, res) => {
  try {
    const data = await repository.get();
    return res.status(HTTPstatus.OK).send(data);
  } catch (e) {
    return res.status(HTTPstatus.INTERNAL_SERVER_ERROR).send({
      message: 'Falha ao processar sua requisição',
    });
  }
};

exports.getByName = async (req, res) => {
  try {
    const data = await repository.getByName(req.params.name);
    return res.status(HTTPstatus.OK).send(data);
  } catch (e) {
    return res.status(HTTPstatus.INTERNAL_SERVER_ERROR).send({
      message: 'Falha ao processar sua requisição',
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await repository.getById(req.params.id);
    return res.status(HTTPstatus.OK).send(data);
  } catch (e) {
    return res.status(HTTPstatus.INTERNAL_SERVER_ERROR).send({
      message: 'Falha ao processar sua requisição',
    });
  }
};

exports.create = async (req, res) => {
  try {
    await repository.create(req.body);
    return res.status(HTTPstatus.CREATED).send({
      message: 'Time cadastrado com sucesso!',
    });
  } catch (e) {
    return res.status(HTTPstatus.INTERNAL_SERVER_ERROR).send({
      message: 'Falha ao cadastrar time!',
    });
  }
};

exports.update = async (req, res) => {
  try {
    await repository.update(req.params.id, req.body);
    return res.status(HTTPstatus.OK).send({
      message: 'Time atualizado com sucesso!',
    });
  } catch (e) {
    return res.status(HTTPstatus.INTERNAL_SERVER_ERROR).send({
      message: 'Falha ao atualizar time!',
      data: e,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    await repository.delete(req.params.id);
    return res.status(HTTPstatus.OK).send({
      message: 'Time removido com sucesso!',
    });
  } catch (e) {
    return res.status(HTTPstatus.BAD_REQUEST).send({
      message: 'Falha ao remover time!',
      data: e,
    });
  }
};
