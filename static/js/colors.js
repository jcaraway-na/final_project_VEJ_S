

export function trafficIncidentColor(incidentName){
    let color;
    
    if(incidentName === 'AUTO/ PED'){

        
        return color = 'rgba(214, 100, 119,0.5)';
    }
    else if(incidentName === 'BLOCKED DRIV/ HWY'){


        return color = 'rgba(231, 146, 112,0.5)';
    }
    else if(incidentName === 'COLLISION'){


        return color = 'rgba(227, 192, 130,0.5)';
    }
    else if(incidentName === 'COLLISION WITH INJURY'){


        return color = 'rgba(31, 138, 110,0.5)';
    }
    else if(incidentName === 'COLLISION/PRIVATE PROPERTY'){


        return color = 'rgba(11, 51, 116,0.5)';
    }
    else if(incidentName === 'COLLISN/ LVNG SCN'){


        return color = 'rgba(152, 107, 188,0.5)';
    }
    else if(incidentName === 'Crash Service'){


        return color = 'rgba(2, 102, 3,0.5)';
    }
    else if(incidentName === 'Crash Urgent'){


        return color = 'rgba(141, 47, 181,0.5)';
    }
    else if(incidentName === 'LOOSE LIVESTOCK'){

        
        return color = 'rgba(173, 114, 83,0.5)';
    }
    else if(incidentName === 'Stalled Vehicle'){


        return color = 'rgba(255, 181, 10,0.5)';
    }
    else if(incidentName === 'Traffic Hazard'){


        return color = 'rgba(92, 104, 68,0.5)';
    }
    else if(incidentName === 'TRFC HAZD/ DEBRIS'){


        return color = 'rgba(79, 71, 60,0.5)';
    }
    else if(incidentName === 'VEHICLE FIRE'){


        return color = 'rgba(156, 17, 73,0.5)';
    }
    else{
        return color = 'rgba(114, 137, 218,0.5)';
    }
}