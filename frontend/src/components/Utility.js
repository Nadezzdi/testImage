import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class Spinner extends Component {
  render() {
    return(
      <div>
        <FontAwesomeIcon icon="spinner" spin={true}/>
      </div>
    )
  }
}

export {Spinner}
