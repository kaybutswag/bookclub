import React from "react";

export const ListItem = props => (
  <li className="list-group-item">
    <div className="row">
		<div className="col-3">
			{props.number+1}.
		</div>
		<div className="col-8">
			<p className="title">
			{props.title}
			</p>
			<p className="author">
			by {props.author}
			</p>
		</div>
		<div className="col-1">
		{props.children}
		</div>
	</div>
  </li>
);
