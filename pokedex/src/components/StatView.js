import React, { Component } from 'react';
import axios from 'axios';

import './StatView.css'


class StatView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      id: 0,
      sprites: [],
      hp: 0,
      att: 0,
      spatt: 0,
      spdef: 0,
      speed: 0,
      moves: [],
      types: [],
    }
  }
  //Takes in pokemon name
  getPokemon = () => {
    axios.get('https://pokeapi.co/api/v2/pokemon/bulbasaur')
      .then(res => {
        let data = res.data;
        let sprites = [data.sprites.front_default, data.sprites.front_shiny, data.sprites.back_default, data.sprites.back_shiny];
        let moveList = [];
        let type = [];
        let id = data.id;
        let name = data.name;
        
        //loop over types and push into type array
        for (let i = 0; i < data.types.length; i++) {
          type.push(data.types[i].type.name)
        }
        //loop over moves and push into array
        for (let i = 0; i < 3; i++) {
          moveList.push(data.moves[i].move.name);
        }

        this.setState({
          name: name,
          id: id,
          sprites: sprites,
          hp: data.stats[4].base_stat,
          att: data.stats[3].base_stat,
          spatt: data.stats[2].base_stat,
          spdef: data.stats[1].base_stat,
          speed: data.stats[0].base_stat,
          moves: moveList,
          types: type,
        })
      })
  }

  //add leading zeros to id if necessary
  heading = () => {
    let prefix = ''
    //id 1 - 9 add 00
    if (this.state.id < 10) {
      prefix = '00';
    }
    //id greater 9 < 100 add 0
    else if (this.state.id < 100) {
      prefix = '0';
    }
    //id 100 and up don't add anything
    return prefix + this.state.id
  }


  toList = () => {
    this.props.toList();
  }

  // map over pokemon types list
  typeList = () => {
    return <p className="text-center">{this.state.types.map((e, i) => {
      //use type as className
      return <span key={i} className={`types badge  ${e}`} >{e} </span>
    })}</p>
  }

  spriteList = () => {
    return this.state.sprites.map((e, i) => {
      return <img key={i} src={e} alt='' className="col middle" />
    })
  }

  render() {
    this.getPokemon();
    return (
      <>
        <div className="container">
          
          <div className="row">
            <div className="col">
              <hr />
              <h1 className="text-right"># <this.heading /> - {this.state.name}</h1>
            </div> 
          </div>

          <div className="row">
            <div className="col">
              <div className="row">
                <div className="col">
                  <img src="https://img.pokemondb.net/artwork/bulbasaur.jpg" alt="" className="rounded "/>
                </div>
              </div>

              <div className="row">
                <div className="col">
                <this.typeList />
                </div>
              </div>
            </div>

            <div className="col">
              <div className="row">
              <this.spriteList />
              </div>
              <h3 className='text-center'>Default</h3>
            </div>
          </div>

          <div className="row"></div>
        </div>
        <h1 onClick={this.toList}></h1>
      </>
    )
  }

}





export default StatView;