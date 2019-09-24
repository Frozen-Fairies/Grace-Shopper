import React from 'react'
import {updateFilmThunk, getAllFilmsThunk} from '../store/admin'
import {connect} from 'react-redux'

class DisconnectedAdminEditFilm extends React.Component {
  async componentDidMount() {
    await this.props.getAllFilms()
  }

  render() {
    // eslint-disable-next-line radix
    //console.log((this.props.films.filter( film => film.id === parseInt(this.props.match.params.id) )[0]))
    let editFilm = {
      id: '',
      uniqueId: '',
      title: '',
      description: '',
      genre: '',
      imageAltText: '',
      imageUrl: '',
      inventory: '',
      price: '',
      compareAtPrice: '',
      published: '',
      releaseDate: '',
      tags: ''
    }
    if (this.props.films.length) {
      editFilm = this.props.films.filter(
        film => film.id === parseInt(this.props.match.params.id)
      )[0]
    }
    let tags = JSON.stringify(editFilm.tags)
    tags = tags.slice(1, -1)

    return (
      <div className="container is-fluid">
        <form
          id="edit-film"
          onSubmit={evt => {
            evt.preventDefault()

            let newCompareAtPrice = evt.target.compareAtPrice.value
            if (newCompareAtPrice === '') {
              newCompareAtPrice = null
            }

            let published = false
            if (evt.target.published.value === 'true') {
              published = true
            }

            let newTags = JSON.parse(`[${evt.target.tags.value}]`)

            const newProps = {
              id: evt.target.id.value,
              title: evt.target.title.value,
              description: evt.target.description.value,
              genre: evt.target.genre.value,
              imageAltText: evt.target.imageAltText.value,
              imageUrl: evt.target.imageUrl.value,
              inventory: evt.target.inventory.value,
              price: evt.target.price.value,
              compareAtPrice: newCompareAtPrice,
              published: published,
              tags: newTags
            }

            this.props.updateFilm(newProps, this.props.match.params.id)
          }}
        >
          <label htmlFor="id">id</label>
          <input type="text" name="id" defaultValue={editFilm.id} readOnly />
          <label htmlFor="uniqueId">uniqueId</label>
          <input
            type="text"
            name="uniqueId"
            defaultValue={editFilm.uniqueId}
            readOnly
          />
          <label htmlFor="title">title</label>
          <input type="text" name="title" defaultValue={editFilm.title} />
          <label htmlFor="description">description</label>
          <input
            type="text"
            name="description"
            defaultValue={editFilm.description}
          />
          <label htmlFor="genre">genre</label>
          <input type="text" name="genre" defaultValue={editFilm.genre} />
          <label htmlFor="imageAltText">imageAltText</label>
          <input
            type="text"
            name="imageAltText"
            defaultValue={editFilm.imageAltText}
          />
          <label htmlFor="imageUrl">imageUrl</label>
          <input type="text" name="imageUrl" defaultValue={editFilm.imageUrl} />
          <label htmlFor="inventory">inventory</label>
          <input
            type="number"
            name="inventory"
            defaultValue={editFilm.inventory}
          />
          <label htmlFor="price">price</label>
          <input type="number" name="price" defaultValue={editFilm.price} />
          <label htmlFor="compareAtPrice">compareAtPrice</label>
          <input
            type="number"
            name="compareAtPrice"
            defaultValue={editFilm.compareAtPrice}
          />
          <label htmlFor="published">published</label>
          <input
            type="text"
            name="published"
            defaultValue={editFilm.published}
          />
          <label htmlFor="tags">tags</label>
          <input type="text" name="tags" defaultValue={tags} />
          <button type="submit">Update Film</button>
        </form>
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
    updateFilm: (film, id) => dispatch(updateFilmThunk(film, id)),
    getAllFilms: () => dispatch(getAllFilmsThunk())
  }
}

const AdminEditFilm = connect(mapStateToProps, mapDispatchToProps)(
  DisconnectedAdminEditFilm
)

export default AdminEditFilm
