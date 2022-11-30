const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const { PrismaClient } = require('@prisma/client')
require('dotenv').config()
require('express-async-errors')

const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

function toPercents(value) {
	return (value * 100).toFixed(2)
}

app.get('/result', async (req, res, next) => {
	const { teamA, teamB } = req.query

	if (isNaN(+teamA) || isNaN(+teamB))
		return res.status(400).json({ message: 'Invalid team id' })

	const result = await prisma.result_football.findMany({
		where: {
			id_home_team: +teamA,
			id_away_team: +teamB,
		},
		select: {
			// id: true,
			// id_match: true,
			league_dim: true,
			// date_dim_result_football_id_date_startTodate_dim: true,
			// time_dim_result_football_id_time_startTotime_dim: true,
			goal_home_team: true,
			goal_away_team: true,
			// reference_dim: true,
			venue_dim: true,
			// round_dim: true,
			// status_dim: true,
			// time_dim_result_football_id_time_availableTotime_dim: true,
			// date_dim_result_football_id_date_availableTodate_dim: true,
			// isDelete: true,
		},
	})

	if (!result)
		return res.status(404).json({ statusCode: 404, message: 'Result not found' })

	const finalResult = result.map(item => {
		return {
			league: item.league_dim.name_league,
			goal_home_team: item.goal_home_team,
			goal_away_team: item.goal_away_team,
			venue: item.venue_dim.name_venue,
		}
	})

	// const finalResult = {
	// 	id: result.id,
	// 	id_match: result.id_match,
	// 	league: result.league_dim.name_league,
	// 	date_start: result.date_dim_result_football_id_date_startTodate_dim,
	// 	time_start: result.time_dim_result_football_id_time_startTotime_dim,
	// 	goal_home_team: result.goal_home_team,
	// 	goal_away_team: result.goal_away_team,
	// 	reference: result.reference_dim.name_reference,
	// 	venue: result.venue_dim,
	// 	round: result.round_dim,
	// 	status: result.status_dim,
	// 	time_available: result.time_dim_result_football_id_time_availableTotime_dim,
	// 	date_available: result.date_dim_result_football_id_date_availableTodate_dim,
	// 	isDeleted: result.isDelete,
	// }

	res.status(200).json({ statusCode: 200, data: finalResult })
})

app.get('/teamA', async (req, res, next) => {
	const teamA = await prisma.team_dim.findMany()
	res.status(200).json({ statusCode: 200, data: teamA })
})

app.get('/teamB', async (req, res, next) => {
	const { teamA } = req.query

	if (isNaN(+teamA)) return res.status(400).json({ message: 'Invalid team id in query' })

	const teamB = await prisma.result_football.findMany({
		where: {
			id_home_team: +teamA,
		},
		select: {
			id_away_team: true,
			team_dim_result_football_id_away_teamToteam_dim: true,
		},
		distinct: ['id_away_team'],
	})

	const finalTeamB = teamB.map(item => {
		return {
			id: item.id_away_team,
			name: item.team_dim_result_football_id_away_teamToteam_dim.name_team,
		}
	})

	res.status(200).json({ statusCode: 200, data: finalTeamB })
})

app.get('/report', async (req, res, next) => {
	const { teamA, teamB } = req.query
	if (isNaN(+teamA) || isNaN(+teamB))
		return res.status(400).json({ message: 'Invalid team id' })

	const venueA = await prisma.result_football.findFirst({
		where: {
			id_home_team: +teamA,
			id_away_team: +teamB,
		},
		select: {
			venue_dim: true,
			team_dim_result_football_id_home_teamToteam_dim: true,
		},
	})

	const venueB = await prisma.result_football.findFirst({
		where: {
			id_home_team: +teamB,
			id_away_team: +teamA,
		},
		select: {
			venue_dim: true,
			team_dim_result_football_id_home_teamToteam_dim: true,
		},
	})

	const reportA = await prisma.result_football.aggregate({
		where: {
			id_home_team: +teamA,
			id_away_team: +teamB,
		},
		_sum: {
			goal_home_team: true,
			goal_away_team: true,
		},
	})

	const reportB = await prisma.result_football.aggregate({
		where: {
			id_home_team: +teamB,
			id_away_team: +teamA,
		},
		_sum: {
			goal_home_team: true,
			goal_away_team: true,
		},
	})

	const homeWinRateA =
		reportA._sum.goal_home_team /
		(reportA._sum.goal_home_team + reportA._sum.goal_away_team)

	const homeWinRateB =
		reportB._sum.goal_home_team /
		(reportB._sum.goal_home_team + reportB._sum.goal_away_team)

	const result = {
		teamA: {
			name: venueA.team_dim_result_football_id_home_teamToteam_dim.name_team,
			venue: venueA.venue_dim.name_venue,
			homeWinRate: toPercents(homeWinRateA),
			awayWinRate: toPercents(1 - homeWinRateA),
			detail: reportA._sum,
		},
		teamB: {
			name: venueB.team_dim_result_football_id_home_teamToteam_dim.name_team,
			venue: venueB.venue_dim.name_venue,
			homeWinRate: toPercents(homeWinRateB),
			awayWinRate: toPercents(1 - homeWinRateB),
			detail: reportB._sum,
		},
	}

	res.status(200).json({ statusCode: 200, data: result })
})

app.listen(4500, () => console.log('Server listening on port 4500'))
