import React from 'react'
import {ViewType} from "../ViewTypes";
import viewProps from "../data/viewProps";
import {viewState} from "../data/viewState";
import Listener from "../Listener";
import GoalList from "../goals/GoalList";
import {GoalType} from "../../model/GoalType";
import AssignWeekly from "../goals/AssignWeekly";


export default class WeekyGoalsView extends React.Component<viewProps, viewState> {
	constructor(props: viewProps) {
		super(props);
		this.listener = new Listener(this);
	}

	shouldComponentUpdate(nextProps: Readonly<viewProps>, nextState: Readonly<viewState>, nextContext: any): boolean {
		//TODO check model
		return true;
	}

	listener: Listener;
	render = () => {
		let model = this.props.model;
		return(<div>
			<p>Weekly Plan</p>
			<GoalList
				goals={model.weeklyGoals}
				type={GoalType.WEEKLY}
				decompose={model.startDecomposeGoal}
				delete={model.deleteWeeklyGoal}
				add={model.addWeeklyGoal}
				roles={model.roles}
				optionalButton={(goal, role) => {
					return <AssignWeekly goal={goal} post={(goal, daily, date) => {
							this.props.model.deleteWeeklyGoal(role, goal.name);
							this.props.model.addDailyGoalForDate(date, daily);
						}
				}/>
			 }}/>
			<button onClick={() => this.state.model.changeView(ViewType.MAIN)}>done</button>
		</div>);
	}
}
