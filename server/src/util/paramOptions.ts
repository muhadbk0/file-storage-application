export default (req:any) =>{
    const options = Object();
    if(!req.query)
      {
        options.limit = 10;
        options.skip = 0;
        return options
      }
    if (req.query._end && req.query._start) {
        options.limit = parseInt(req.query._end) - parseInt(req.query._start)
        options.skip = parseInt(req.query._start)
    }
    else{
      options.limit = 10;
      options.skip = 0;
    }
    
    // if (req.query._sort && req.query._order) {
    //     options.sort = {}
    //     let sort = (req.query._sort === 'id') ? '_id' : req.query._sort
    //     options.sort[sort] = req.query._order
    // }
    // else{
      options.sort = {'_id': -1}
   // }
    return options
  }