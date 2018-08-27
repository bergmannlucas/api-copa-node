const HTTPstatus = require('http-status');
const _ = require('lodash');
const repository = require('../repositories/team.repository');

exports.get = async (req, res) => {
  try {
    const data = await repository.get();

    if (data.length === 0) {
      return res.status(HTTPstatus.NO_CONTENT).end();
    }

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

    if (!data) {
      return res.status(HTTPstatus.NO_CONTENT).end();
    }

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

    if (!data) {
      return res.status(HTTPstatus.NO_CONTENT).end();
    }

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

/**
 * Caso o time nao possua 11 jogadores (com 1 goleiro) ele nao estara apto para jogar
 */
exports.teamCanPlay = async (req, res) => {
  const playersList = await repository.getPlayersList(req.params.id);

  if (playersList.length !== 11) {
    return res.status(HTTPstatus.OK).send({
      status: false,
      message: 'O time necessita de 11 jogadores para jogar!',
    });
  }

  const goalkeepersList = _.filter(playersList, { position: 'Goleiro' });

  if (goalkeepersList.length !== 1) {
    return res.status(HTTPstatus.OK).send({
      status: false,
      message: 'O time deve possuir 1 goleiro!',
    });
  }

  return res.status(HTTPstatus.OK).send({
    status: true,
    message: 'O time está apto para jogar!',
  });
};
