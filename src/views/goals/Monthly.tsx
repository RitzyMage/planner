import React from 'react'
import viewProps from "../data/viewProps";
import {ViewType} from "../ViewTypes";
import {viewState} from "../data/viewState";
import Listener from "../Listener";
import {GoalType} from "../../goalData/GoalType";
import GoalList from "./GoalList";


export default class MonthlyView extends React.Component<viewProps, viewState> {

	private originalSize: number;

	constructor(props:viewProps) {
		super(props);
		this.listener = new Listener(this);

		this.originalSize = props.model.monthlyGoals.size;
	}

	shouldComponentUpdate(nextProps: Readonly<viewProps>, nextState: Readonly<viewState>, nextContext: any): boolean {
		let newSize = nextProps.model.monthlyGoals.size;
		if (newSize === this.originalSize) {
			return false;
		}

		this.originalSize = newSize;
		return true;
	}

	listener: Listener;

	render = () => {
		return(<div>
			<p>Monthly View</p>
			<GoalList
				goals={this.state.model.monthlyGoals}
				delete={this.state.model.deleteMonthlyGoal}
				add={this.state.model.addMonthlyGoal}
			 	decompose={this.state.model.startDecomposeGoal}
				roles={this.state.model.roles}
			 	type={GoalType.MONTHLY}
				optionalButton={() => null}/>

			<button onClick={() => this.state.model.changeView(ViewType.CONTINUOUS)}>done</button>
		</div>);
	};

}
