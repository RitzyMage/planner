import React from 'react'
import viewProps from "../data/viewProps";
import {ViewType} from "../ViewTypes";
import Listener from "../Listener";
import {viewState} from "../data/viewState";
import AddRepeatingGoal from "./AddRepeatingGoal";
import RepeatingGoal from "../../goalData/RepeatingGoal";


export default class RepeatingGoalView extends React.Component<viewProps, viewState> {
	private originalSize: number;

	constructor(props: viewProps) {
		super(props);
		this.listener = new Listener(this);

		this.originalSize = props.model.repeatingGoals.length;
	}

	shouldComponentUpdate(nextProps: Readonly<viewProps>, nextState: Readonly<viewState>, nextContext: any): boolean {
		let newSize = nextProps.model.repeatingGoals.length;
		if (newSize === this.originalSize) {
			return false;
		}

		this.originalSize = newSize;
		return true;
	}

	listener: Listener;

	deleteGoal = (goal: RepeatingGoal) => {
		this.props.model.deleteRepeatingGoal(goal);
	};


	render = () => {
		return (<div>
			<p>Edit Continuous Goals</p>
			{this.state.model.repeatingGoals.map((value, index) => (<ul>
				<li key={value.name}>{value.name}<button onClick={() => this.deleteGoal(value)}>DELETE</button> </li>
			</ul>))}
			<AddRepeatingGoal submit={this.props.model.addRepeatingGoal} roles={this.props.model.roles}/>
			<button onClick={() => this.state.model.changeView(ViewType.WEEKLY_GOALS)}>done</button>
		</div>);
	};
}
