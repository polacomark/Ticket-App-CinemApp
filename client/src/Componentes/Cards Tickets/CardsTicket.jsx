import React from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    card: {
        maxWidth: '345px',
      },
});

export default function CardTicket({poster_path, original_title, release_date}){
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia 
          component={`img`}
          height="280"
          image={`https://image.tmdb.org/t/p/w185_and_h278_bestv2`+poster_path}
          title={original_title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {original_title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Genero: Comedia Accion Aventuras
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Estreno: {release_date}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to='/detail' style={{'textDecoration':'none'}}>
            <Button variant='contained' size="small" disableElevation color="primary">
                Mas detalles
            </Button>
        </Link>
      </CardActions>
    </Card>
  );
}