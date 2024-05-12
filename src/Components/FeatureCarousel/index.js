import { Carousel } from '@mantine/carousel';
import {  Box } from '@mantine/core';
import feature1 from '../../assets/images/feature-1.svg';
import feature2 from '../../assets/images/feature-2.svg';
import feature3 from '../../assets/images/feature-3.svg'
import useStyles from './style';
function FeatureCarousel() {
    const {classes} = useStyles(useStyles)
    const features = [
        {
            title: 'Get a link you can share',
            description: 'Click New meeting to get a link you can send to people you want to meet with',
            image: feature1,
        },
        {
            title: 'Plan ahead',
            description: 'Click  New meeting to schedule meetings in Google Calendar and send invites to participants',
            image: feature2,
        },
        {
            title: 'Your meeting is safe',
            description: 'Connect, collaborate, and celebrate from anywhere with Google Meet',
            image: feature3,
        }
    ]
    return (
        <Carousel mx="auto" withIndicators loop>
            {
                features.map((feature) => {
                    return (
                        <Carousel.Slide>
                            <Box className={classes.carouselTile}>
                            <img src={feature.image}/> 
                            <h2 color="primary.0">{feature.title}</h2>
                            <Box color="primary.0">{feature.description}</Box>

                            </Box>
                        </Carousel.Slide>
                    )
                })
            }
        </Carousel>
    );
}
export default FeatureCarousel;