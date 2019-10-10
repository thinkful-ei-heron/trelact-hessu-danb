import React, { Component } from 'react';
import List from './List'
import './App.css';

const newRandomCard = () => {
	const id = Math.random().toString(36).substring(2, 4)
	  + Math.random().toString(36).substring(2, 4);
	return {
	  id,
	  title: `Random Card ${id}`,
	  content: 'lorem ipsum',
	}
}

function omit(obj, keyToOmit) {
	return Object.entries(obj).reduce(
	  (newObj, [key, value]) =>
		  key === keyToOmit ? newObj : {...newObj, [key]: value},
	  {}
	);
}

class App extends Component {
  static defaultProps = {
    store: {
      lists: [],
      allCards: {},
    }
  };

  state = {
		lists: [
			{
				id: '1',
				header: 'First list',
				cardIds: [ 'a', 'b', 'e', 'f', 'g', 'j', 'l', 'm' ],
			},
			{
				id: '2',
				header: 'Second list',
				cardIds: ['b', 'c', 'd', 'f', 'h', 'i', 'k'],
			},
			{
				id: '3',
				header: 'Third list',
				cardIds: [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm' ],
			},
			{
				id: '4',
				header: 'Fourth list',
				cardIds: [ 'l', 'm' ],
			},
		],
		allCards: {
			'a': { id: 'a', title: 'First card', content: 'lorem ipsum' },
			'b': { id: 'b', title: 'Second card', content: 'lorem ipsum' },
			'c': { id: 'c', title: 'Third card', content: 'lorem ipsum' },
			'd': { id: 'd', title: 'Fourth card', content: 'lorem ipsum' },
			'e': { id: 'e', title: 'Fifth card', content: 'lorem ipsum' },
			'f': { id: 'f', title: 'Sixth card', content: 'lorem ipsum' },
			'g': { id: 'g', title: 'Seventh card', content: 'lorem ipsum' },
			'h': { id: 'h', title: 'Eighth card', content: 'lorem ipsum' },
			'i': { id: 'i', title: 'Ninth card', content: 'lorem ipsum' },
			'j': { id: 'j', title: 'Tenth card', content: 'lorem ipsum' },
			'k': { id: 'k', title: 'Eleventh card', content: 'lorem ipsum' },
			'l': { id: 'l', title: 'Twelfth card', content: 'lorem ipsum' },
			'm': { id: 'm', title: 'Thirteenth card', content: 'lorem ipsum' },
		},
  }

	handleDeleteItem = (e) => {
    const { lists, allCards } = this.state
    const newList = lists.map(listObj => ({
      ...listObj,
      cardIds: listObj.cardIds.filter(id => id !== e)
	}));
	const newCards = omit(allCards, e);
    console.log(newList)
    this.setState({
      lists: newList,
      allCards: newCards
    })
}	

handleAddItem = (e) => {
	const newCards = newRandomCard();
	const newList = this.state.lists.map(listObj => {
		if(listObj.id === e) {
			return {
				...listObj,
				cardIds: [...listObj.cardIds, newCards.id]
			}
		} 
		return listObj;
	})

	console.log(e)	
	this.setState({
		lists: newList,
		allCards: {
			...this.state.allCards,
			[newCards.id]: newCards
		}
	})
}



  render() {
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {this.state.lists.map(list => (
            <List
              key={list.id}
              id={list.id}
              header={list.header}
              cards={list.cardIds.map(id => this.state.allCards[id])}
              deleteClick={this.handleDeleteItem}
              addCardClick={this.handleAddItem}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
