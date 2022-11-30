import './App.css'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import 'bootstrap/dist/css/bootstrap.min.css'
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { CSVLink, CSVDownload } from 'react-csv'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { useEffect, useState } from 'react'

function App() {
	const [teamA, setTeamA] = useState([])
	const [teamB, setTeamB] = useState([])
	const [selectedA, setSelectedA] = useState('')
	const [selectedB, setSelectedB] = useState('')
	const [exportData, setExportData] = useState([])
	const [report, setReport] = useState({})

	const headers = [
		{ label: 'Team Name', key: 'team_name' },
		{ label: 'Venue', key: 'venue' },
		{ label: 'Home Win Rate', key: 'home_win_rate' },
		{ label: 'Away Win Rate', key: 'away_win_rate' },
	]

	const exportPDF = () => {
		const pdf = new jsPDF('landscape', 'cm', 'a4')
		html2canvas(document.body).then(canvas => {
			const imgData = canvas.toDataURL('image/png')
			const imgProperties = pdf.getImageProperties(imgData)
			const pdfWidth = pdf.internal.pageSize.getWidth()
			const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width
			pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
			pdf.save('report.pdf')
		})
	}

	const onChangeA = e => {
		setSelectedA(e.target.value)
		console.log(e.target.value)
		if (e.target.value !== '#') {
			fetch(`http://localhost:4500/teamB?teamA=${selectedA}`)
				.then(res => res.json())
				.then(res => setTeamB([...res.data]))
		}
	}

	const onChangeB = e => {
		setSelectedB(e.target.value)
		console.log(e.target.value)
	}

	useEffect(() => {
		const data = []
		for (const team in report) {
			data.push({
				team_name: report[team].name,
				venue: report[team].venue,
				home_win_rate: report[team].homeWinRate,
				away_win_rate: report[team].awayWinRate,
			})
		}
		setExportData(data)
	}, [report])

	useEffect(() => {
		fetch(`http://localhost:4500/teamB?teamA=${selectedA}`)
			.then(res => res.json())
			.then(res => setTeamB(res.data))
	}, [selectedA])

	useEffect(() => {
		let resData
		fetch(`http://localhost:4500/report?teamA=${selectedA}&teamB=${selectedB}`)
			.then(res => res.json())
			.then(res => {
				resData = { ...res.data }
				setReport(res.data)
			})

		const data = []
		for (const team in resData) {
			data.push({
				team_name: report[team].name,
				venue: report[team].venue,
				home_win_rate: report[team].homeWinRate,
				away_win_rate: report[team].awayWinRate,
			})
		}
		setExportData(data)
	}, [selectedB])

	useEffect(() => {
		fetch('http://localhost:4500/teamA')
			.then(res => res.json())
			.then(res => setTeamA([...res.data]))
	}, [])

	return (
		<Container fluid>
			<Navbar expand='lg'>
				<Container fluid>
					<Navbar.Brand style={{ color: 'white' }} href='#'>
						Datawarehouse
					</Navbar.Brand>
					<Navbar.Toggle aria-controls='navbarScroll' />
					<Navbar.Collapse id='navbarScroll'>
						<Nav
							className='me-auto my-2 my-lg-0'
							style={{ maxHeight: '100px' }}
							navbarScroll
						></Nav>
						<Form className='d-flex'>
							<Form.Control
								type='search'
								placeholder='Search'
								className='me-2'
								aria-label='Search'
							/>
							<Button variant='outline-success'>Search</Button>
						</Form>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<Row
				style={{ marginTop: '100px', display: 'flex', justifyContent: 'space-between' }}
			>
				<Col xl={4}>
					{' '}
					<Form.Select onChange={onChangeA} aria-label='Default select example'>
						<option value='#'>Select team 1</option>
						{teamA.map(team => (
							<option value={team.id} key={team.id}>
								{team.name_team}
							</option>
						))}
					</Form.Select>
				</Col>
				<Col xl={4}>
					{' '}
					<Form.Select onChange={onChangeB} aria-label='Default select example'>
						<option value='#'>Select team 2</option>
						{teamB.map(team => (
							<option value={team.id} key={team.id}>
								{team.name}
							</option>
						))}
					</Form.Select>
				</Col>
			</Row>
			<div id='report'>
				<Row style={{ marginTop: '10px' }}>
					<Col>
						{' '}
						<Table id='report' bordered>
							<tbody>
								<tr>
									<td>{report?.teamA?.name ? report.teamA.name : 'Name Team A'}</td>
								</tr>
								<tr>
									<td>{report?.teamA?.venue ? report.teamA.venue : 'Venue'}</td>
								</tr>
								<tr>
									<td>
										{report?.teamA?.homeWinRate
											? report.teamA.homeWinRate
											: 'Home Win Rate'}
									</td>
								</tr>
								<tr>
									<td>
										{report?.teamA?.awayWinRate
											? report.teamA.awayWinRate
											: 'Away Win Rate'}
									</td>
								</tr>
							</tbody>
						</Table>
					</Col>
					<Col>
						<Table bordered>
							<tbody>
								<tr>
									<td>Name team</td>
								</tr>
								<tr>
									<td>Venue</td>
								</tr>
								<tr>
									<td>Home win rate</td>
								</tr>
								<tr>
									<td>Away win rate</td>
								</tr>
								<tr>
									<td>Goal scoreds</td>
								</tr>
								<tr>
									<td>Number of win</td>
								</tr>
								<tr>
									<td>Number of lose</td>
								</tr>
							</tbody>
						</Table>
					</Col>
					<Col>
						<Table bordered>
							<tbody>
								<tr>
									<td>{report?.teamB?.name ? report.teamB.name : 'Name Team B'}</td>
								</tr>
								<tr>
									<td>{report?.teamB?.venue ? report.teamB.venue : 'Venue'}</td>
								</tr>
								<tr>
									<td>
										{report?.teamB?.homeWinRate
											? report.teamB.homeWinRate
											: 'Home Win Rate'}
									</td>
								</tr>
								<tr>
									<td>
										{report?.teamB?.awayWinRate
											? report.teamB.awayWinRate
											: 'Away Win Rate'}
									</td>
								</tr>
							</tbody>
						</Table>
					</Col>
				</Row>
			</div>
			<CSVLink className='export' data={exportData} headers={headers}>
				Export To CSV
			</CSVLink>
			<button class='export' onClick={exportPDF}>
				Export PDF
			</button>
		</Container>
	)
}

export default App
