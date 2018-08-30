const HTTPstatus = require('http-status');
const repository = require('../repositories/player.repository');
const teamRepository = require('../repositories/team.repository');

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
    const playersList = await teamRepository.getPlayersList(req.body.team);

    if (playersList.length === 11) {
      return res.status(HTTPstatus.OK).send({
        message: 'O time já possui 11 jogadores!',
      });
    }

    const playerInserted = await repository.create(req.body);

    await teamRepository
      .pushPlayers(playerInserted.team, playerInserted._id);

    return res.status(HTTPstatus.CREATED).send({
      message: 'Jogador cadastrado com sucesso!',
    });
  } catch (e) {
    return res.status(HTTPstatus.INTERNAL_SERVER_ERROR).send({
      message: 'Falha ao cadastrar jogador!',
    });
  }
};

exports.update = async (req, res) => {
  try {
    await repository.update(req.params.id, req.body);
    return res.status(HTTPstatus.OK).send({
      message: 'Jogador atualizado com sucesso!',
    });
  } catch (e) {
    return res.status(HTTPstatus.BAD_REQUEST).send({
      message: 'Falha ao atualizar jogador!',
      data: e,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    await repository.delete(req.params.id);
    return res.status(HTTPstatus.OK).send({
      message: 'Jogador removido com sucesso!',
    });
  } catch (e) {
    return res.status(HTTPstatus.BAD_REQUEST).send({
      message: 'Falha ao remover jogador!',
      data: e,
    });
  }
};
