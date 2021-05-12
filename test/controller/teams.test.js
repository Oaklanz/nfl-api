const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const { describe, it } = require('mocha')
const { getAllTeams, getTeamById, saveNewTeam } = require('../../controllers/teams')
const models = require('../../models')
const { singleTeam, postedTeam, teamsList } = require('../mock/teams')

chai.use(sinonChai)
const { expect } = chai



describe('Controllers - Teams', () => {
  describe('getAllTeams', () => {
    it('retrieves a list of teams from the database and calls response.send() with the list', async () => {
      const stubbedFindAll = sinon.stub(models.Teams, 'findAll').returns(teamsList)
      const stubbedSend = sinon.stub()
      const response = { send: stubbedSend }

      await getAllTeams({}, response)
      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(teamsList)
    })
  })
  describe('getTeamById', () => {
    it('retrieves a single team with the provided id from the DB and calls response.send() with the it', async () => {
      const stubbedFindOne = sinon.stub(models.Teams, 'findOne').returns(singleTeam)
      const request = { params: { id: 1 } }
      const stubbedSend = sinon.stub()
      const response = { send: stubbedSend }

      await getTeamById(request, response)
      expect(stubbedFindOne).to.have.been.calledWith({ where: { id: 1 } })
      expect(stubbedSend).to.have.been.calledWith(singleTeam)
    })
  })
})





