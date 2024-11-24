

function win(existing, groupName, teamId, ws, ls ) {
    
    const group = existing.group.findIndex(item => item.group == String(groupName));


    const team = existing.group[group].standing.findIndex(item => item.teams == teamId);


    console.log(group, team );

    const dif = ws - ls


    existing.group[group].standing[team].stats.played = existing.group[group].standing[team].stats.played + 1;
    existing.group[group].standing[team].stats.win = existing.group[group].standing[team].stats.win + 1;
    existing.group[group].standing[team].stats.points = existing.group[group].standing[team].stats.points + 3;
    existing.group[group].standing[team].stats.gd = existing.group[group].standing[team].stats.gd + dif
    existing.group[group].standing[team].stats.gs = existing.group[group].standing[team].stats.gs + Number(ws);
    existing.group[group].standing[team].stats.ga = existing.group[group].standing[team].stats.ga + Number(ls);

    existing.group[group].standing[team].stats.form.push('W')
    


  }



  function loss(existing,groupName, teamId, ws, ls) {

    const group = existing.group.findIndex(item => item.group == groupName);

    const team = existing.group[group].standing.findIndex(item => item.teams == teamId);


    const dif = ls - ws

    existing.group[group].standing[team].stats.played = existing.group[group].standing[team].stats.played + 1;
    existing.group[group].standing[team].stats.loss = existing.group[group].standing[team].stats.loss + 1;
    existing.group[group].standing[team].stats.gd = existing.group[group].standing[team].stats.gd + dif
    existing.group[group].standing[team].stats.gs = existing.group[group].standing[team].stats.gs + Number(ls);
    existing.group[group].standing[team].stats.ga = existing.group[group].standing[team].stats.ga + Number(ws);


    existing.group[group].standing[team].stats.form.push('L')


  }






  function draw(existing, groupName,teamId, ws, ls) {

    const group = existing.group.findIndex(item => item.group == groupName);

    const team = existing.group[group].standing.findIndex(item => item.teams == teamId);


    existing.group[group].standing[team].stats.played = existing.group[group].standing[team].stats.played + 1;
    existing.group[group].standing[team].stats.draw = existing.group[group].standing[team].stats.draw + 1;
    existing.group[group].standing[team].stats.points = existing.group[group].standing[team].stats.points + 1;
    existing.group[group].standing[team].stats.gs = existing.group[group].standing[team].stats.gs + Number(ws);
    existing.group[group].standing[team].stats.ga = existing.group[group].standing[team].stats.ga + Number(ls);

    existing.group[group].standing[team].stats.form.push('D')


  }





  async function update(table, group, h, hms, aws, a) {


    
    if (hms > aws) {

      win(table, group, h, hms, aws )
      loss(table, group, a, hms, aws)
                  

    } else if (hms < aws) {
      
      win(table, group, a, aws, hms )
      loss(table, group, h, aws, hms)



    } else if (hma == aws ) {
      draw(table, group, h, hms, aws )
      draw(table, group, a, hms, aws)
    }
      
  };







  module.exports = { update };