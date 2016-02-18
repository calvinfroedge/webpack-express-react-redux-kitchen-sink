export default function(app){
  app.get('/foo', function(req, res){
    setTimeout(function(){
      res.json({'baz': 'bar'});
    }, 2000);
  });

  app.get('/bar', function(req, res){
    setTimeout(function(){
      res.send('bop');
    }, 2000);
  });

  app.post('/bop', function(req, res){
    setTimeout(function(){
      res.status(500).send('Something broke!');
      //res.json({foo: 'bar'});
    }, 2000);
  });
}
