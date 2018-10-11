import React, { Component } from 'react';
import { IconDiv, TitleDiv, LayoutDiv} from './styled-components'

export default class HeaderBar extends Component {
	render(){
		return (<header>
					<LayoutDiv width='40'>
						<IconDiv float='left'>
							<i class="fas fa-bars"></i>
						</IconDiv>
						<TitleDiv>Telegram</TitleDiv>
					</LayoutDiv>
					<LayoutDiv width='60'>
						<TitleDiv>Telegram Service notification</TitleDiv>
						<IconDiv float='right'>
							<i class="fas fa-search"></i>
						</IconDiv>
						<IconDiv float='right'>
							<i class="fas fa-ellipsis-v"></i>
						</IconDiv>
					</LayoutDiv>
				</header>)

	}

}