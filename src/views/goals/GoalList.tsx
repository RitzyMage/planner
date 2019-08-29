import React from "react";
import goal from "../../goalData/Goal";
import {GoalType} from "../../goalData/GoalType";
import AddGoal from "./AddGoal";

interface GoalListProps {
	goals: Map<string, goal[]>;
	type: GoalType;
	decompose: (goal: goal, type: GoalType, role: string) => void;
	delete: (role:string, name: string) => void;
	optionalButton: (goal: goal, role: string) => JSX.Element | null;
	add: (name: goal, role: string) => void;
	roles: string[];
}

export default class GoalList extends React.Component<GoalListProps, {}> {

	render() {
		let goals: JSX.Element[] = [];

		this.props.goals.forEach((value: goal[], key: string) => {
			goals.push(<div key={key}>
				<h2>{key}</h2>
				<ul>
					{value.map((goal: goal, index: number) => <li key={index}>
						{goal.name}
						<button onClick={() => {
							this.props.decompose(goal, this.props.type, key);
						}}>DECOMPOSE
						</button>
						<button onClick={() => {
							this.props.delete(key, goal.name)
						}}>DELETE
						</button>
						{this.props.optionalButton(goal, key)}
					</li>)}
				</ul>
			</div>)
		});

		return (<div>
			<AddGoal add={this.props.add} roles={this.props.roles}/>
			{goals}
		</div>);
	}
};

