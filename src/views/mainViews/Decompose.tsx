import React from 'react'
import viewProps from "../data/viewProps";
import {GoalType} from "../../model/GoalType";
import Listener from "../Listener";
import {viewState} from "../data/viewState";
import DecomposeFinishButton from "../data/DecomposeFinishFunction";
import {GoalWithType} from "../../model/GoalWithType";
import GoalDecomposeList from "../input/GoalDecomposeList";
import DecomposeFinishFunction from "../data/DecomposeFinishFunction";


export default class DecomposeView extends React.Component<viewProps, viewState> {

	constructor(props: viewProps) {
		super(props);
		this.state = {
			model: props.model,
		};
		this.listener = new Listener(this);
	}


	listener: Listener;

	state: viewState;

	shouldComponentUpdate(nextProps: Readonly<viewProps>, nextState: Readonly<viewState>, nextContext: any): boolean {
		//TODO check model
		return true;
	}

	get decomposeFunction(): (goals: GoalWithType[]) => void {
		let model = this.state.model;
		let type =  model.currentlyWorking;

		let decomposeFunction: (goals: GoalWithType[]) => void = () => {};

		switch (type) {
			case GoalType.WEEKLY:
				decomposeFunction = model.decomposeWeeklyGoal;
				break;
			case GoalType.MONTHLY:
				decomposeFunction = model.decomposeMonthlyGoal;
				break;
			case GoalType.LONG_TERM:
				decomposeFunction = model.decomposeLongTermGoal;
				break;
			case GoalType.YEARLY:
				decomposeFunction = model.decomposeYearlyGoal;
				break;
		}
		return (goals: GoalWithType[]) => {
			console.log("DECOMPOSE CALLED");
			decomposeFunction(goals);
			DecomposeFinishFunction(this.state.model)();
		}
	}




	render = () => {
		return (<div>
			<p>Decompose
				{" " + GoalType[this.state.model.currentlyWorking] + " "} goal
				{" " + this.state.model.currentGoal.name + " "}
				from role {this.state.model.currentRole}
			</p>
			<GoalDecomposeList onFinish={this.decomposeFunction}/>
		</div>);
	}
}
