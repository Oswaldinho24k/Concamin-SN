import React from 'react';
import {Avatar, Paper, Subheader, List, ListItem, Divider, IconButton} from 'material-ui';
import { darkBlack} from 'material-ui/styles/colors';
import ActionInfo from 'material-ui/svg-icons/action/info';
import AddIcon from 'material-ui/svg-icons/content/add-circle';

const ExperienciaPanel = ({experiencias}) => {
    let listaExperiencias = [];
    if(experiencias){
        if (experiencias.length > 0){
            listaExperiencias = experiencias.map( (experiencia,key) => {
                return (
                    <div key={key}>
                        <ListItem
                            leftAvatar={<Avatar src="https://www.fixter.camp/static/assets/images/LOGIS-01.png" />}
                            primaryText={
                                <p>{experiencia.cargo}&nbsp;&nbsp;</p>
                            }
                            secondaryText={
                                <p>
                                    <span style={{color: darkBlack}}>{experiencia.empresa}</span>
                                    { } {experiencia.fechaInicio} - {experiencia.fechaFinal} en {experiencia.lugar}
                                </p>
                            } rightIcon={<ActionInfo />}/>
                        <Divider inset={true}/>
                    </div>
                )
            });
        }else {
            listaExperiencias = (<ListItem primaryText='Agregue una experiencia nueva'/>)
        }

    }
    return (
        <Paper zdepth={2} className="extra-info-paper">
            <Subheader>Experiencia</Subheader>
            <IconButton style={{position:'absolute'}} className="add-new-experience" tooltip="Agregar" >
                <AddIcon />
            </IconButton>
            <List>
                {listaExperiencias}
            </List>
        </Paper>
    );
};

export default ExperienciaPanel;