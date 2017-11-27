import React from 'react';

export class FormMultipleOptions extends React.Component {
	//Requires a list (two-dimensional array)
	//Allows user to choose from one item from each list in the set
	constructor(props) {
		super(props);
		this.state ={ 
			selectedValues: props.list.map(e => '')
		}
	}
	render() {
		return (
			<div className="formMultipleOptionsCard">
				{this.props.list.map((subList,i) => 
					<div key={i} onChange={this.handleChange}>
						{subList.map((option, j) => 
							<label key={j}>
								<input type="checkbox" value={option}/>{option}
							</label>
						)}
					</div>
				)}
			</div>
		)
	}
} 


export class FormListSelect extends React.Component {
	//Requires list (Array) and max (integer)
	//Allows user to select {max} values
	//After updating local component state, it passes the values of actively 
	//selected values to a callback updateSelected
	constructor(props) {
		super(props);
		this.state = {
			amntSelected: 0,
			selectedIndices: props.list.map(() => false),
			selectedValues : []
		}
	}
	handleSelect = (e) => {
		//Using indeces and values as separate lists
		//By storing indices we can use the random access performance of arrays
		const index = e.currentTarget.dataset.index;
		const tempIndices = [...this.state.selectedIndices];
		let tempValues = [...this.state.selectedValues]
		let tempAmt = this.state.amntSelected;
		tempIndices[index] = !tempIndices[index];

		//If the new state of the element is active we push the value
		//and increment the amount
		if(tempIndices[index]) {
			tempValues.push(this.props.list[index]);
			tempAmt++;
		}
		else {
			tempValues = tempValues.filter(e => e === this.props.list[index]);
			tempAmt--;
		}

		//After calculating tempAmt we can check if it meets the max
		//If it does we update local state and call the updateSelected callback
		//with the list of selected values as the argument
		if(tempAmt <= this.props.max){
			this.setState({
				selectedIndices: tempIndices, 
				amntSelected: tempAmt,
				selectedValues: tempValues
			}, () => {this.props.updateSelected(this.state.selectedValues)});
		}
	}
	render(){
		return (
			<div>
				<h2>Choose any {this.props.max}</h2>
				<div className="formListCard">
					{this.props.list.map((el, i) => 
						<div 
						data-index={i} 
						onClick={this.handleSelect} 
						key={i}
						className={ "formListCard__item " + 
							(this.state.selectedIndices[i] 
							? "formListCard__item--active" : "" 
							)}>
							<h3>{el}</h3>
						</div>
					)}
				</div>
			</div>
		)
	}
} 

export const FormSize = (props) => (
		<div value={props.size} onChange={props.handleSize} className="formSize">
			{["Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan"].map( (s, i) => 
				<div className="formSize__option" data-value={s} key={i}>
					<img 
					alt="Monster Icon"
					src="../../media/minotaur.svg"
					style={{
						height: (props.scale * (i * 0.6 + 1)) + 'rem',
					}}></img>
					<h2>{s}</h2>
				</div>
				)}
		</div>
	)

export const FormMonsterType = (props) => (
		<select id="type" value={props.type} onChange={props.handleType}>
	       <option value="Aberration">Aberration</option>
	       <option value="Beast">Beast</option>
	       <option value="Celestial">Celestial</option>
	       <option value="Construct">Construct</option>
	       <option value="Dragon">Dragon</option>
	       <option value="Elemental">Elemental</option>
	       <option value="Fey">Fey</option>
	       <option value="Fiend">Fiend</option>
	       <option value="Giant">Giant</option>
	       <option value="Humanoid">Humanoid</option>
	       <option value="Monstrosity">Monstrosity</option>
	       <option value="Ooze">Ooze</option>
	       <option value="Plant">Plant</option>
	       <option value="Undead">Undead</option>
		</select>
    )

export const FormName = (props) => (
	<input 
	className="createName" 
	type="text"
	value={props.name || ''}
	placeholder="Name"
	onChange={props.handleName}
	 />
	)