import React from 'react'
import {getAllFilmsThunk} from '../store/admin'
import {connect} from 'react-redux'
import AdminFilmsRow from './AdminFilmsRow'

class DisconnectedAdminFilms extends React.Component {
  componentDidMount() {
    this.props.getAllFilms()
  }

  render() {
    return (
      <div className="container is-fluid">
        <table>
          <thead>
            <tr>
              <td>Edit</td>
              <td>ID</td>
              <td>Name</td>
              <td>Inventory</td>
              <td>Price</td>
              <td>Compare At Price</td>
              <td>Published</td>
              <td>Release Date</td>
              <td>Created</td>
              <td>Updated</td>
            </tr>
          </thead>

          <tbody>
            {this.props.films.map(film => {
              return <AdminFilmsRow key={film.id} film={film} />
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    films: state.admin.films
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getAllFilms: () => dispatch(getAllFilmsThunk())
  }
}

const AdminFilms = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedAdminFilms
)

export default AdminFilms
