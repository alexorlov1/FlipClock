import { CSSAttribute } from 'flipclock';

export const css: CSSAttribute = {
    '.flip-clock':{
        '.flip-clock-group':{
            '+ .flip-clock-group':{
                marginLeft:'1rem' 
            },
            '.flip-clock-group-items':{
                alignItems:'stretch' 
            },
            '.flip-clock-label':{
                '&.flip-clock-meridium':{
                    fontSize:'1.75em',
                    lineHeight:'1.75em',
                    textTransform:'uppercase',
                    fontWeight:'200' 
                },
                textTransform:'capitalize',
                marginBottom:'.5rem' 
            },
            flexDirection:'column' 
        },
        '.flip-clock-card':{
            '&:not(.animate)':{
                '.active .flip-clock-card-item-inner':{
                    zIndex:'4' 
                },
                '.flip-clock-card-item-inner':{
                    '.top, .bottom':{
                        '&:after':{
                        } 
                    } 
                } 
            },
            '.flip-clock-card-item-inner':{
                '&:first-child':{
                    zIndex:'2' 
                },
                '.top, .bottom':{
                    '&:after':{
                    },
                    '&:before':{
                    },
                    backfaceVisibility:'hidden',
                    fontSize:'4.5em',
                    boxShadow:'inset 0 0 .2em rgba(#000,.5)' 
                },
                '.top':{
                    '&:after':{
                        borderRadius:'.75rem .75rem 0 0' 
                    },
                    '&:before':{
                    },
                    borderRadius:'.75rem .75rem 0 0',
                    lineHeight:'calc(6em/4.5em)' 
                },
                '.bottom':{
                    '&:after':{
                        borderRadius:'0 0 .75rem .75rem' 
                    },
                    '&:before':{
                    },
                    borderRadius:'0 0 .75rem .75rem',
                    lineHeight:'0' 
                } 
            },
            '&.animate':{
                '.flip-clock-card-item-inner':{
                },
                '.top, .bottom, .active, .active > div, .before, .before > div':{
                    '&:after':{
                        animationDuration:'inherit',
                        animationFillMode:'inherit' 
                    },
                    animationDelay:'inherit',
                    animationFillMode:'forwards',
                    animationDuration:'inherit',
                    animationTimingFunction:'inherit' 
                },
                '.before':{
                    '.top':{
                        animationName:'flip-top' 
                    },
                    '.top:after, .bottom:after':{
                        animationName:'show-shadow' 
                    },
                    animationDelay:'0s',
                    animationTimingFunction:'ease-in' 
                },
                '.active':{
                    '& > div':{
                        animationName:'indexing' 
                    },
                    '.top:after, .bottom:after':{
                        animationName:'hide-shadow' 
                    },
                    '.bottom':{
                        animationName:'flip-bottom' 
                    },
                    animationTimingFunction:'ease-out' 
                },
                animationDuration:'80ms',
                animationDelay:'80ms' 
            },
            '.active':{
                '.bottom':{
                    zIndex:'2',
                    transformOrigin:'top center' 
                },
                zIndex:'2' 
            },
            '.before':{
                '.top':{
                    '&:after':{
                    },
                    zIndex:'2',
                    transformOrigin:'bottom center' 
                },
                '.bottom':{
                    '&:after':{
                    } 
                },
                zIndex:'3' 
            },
            borderRadius:'.75rem',
            boxShadow:'0 1.5px 3px rgba(0, 0, 0, 0.24), 0 3px 8px rgba(0, 0, 0, 0.05)',
            fontWeight:'bold' 
        },
        '.flip-clock-divider':{
            '.flip-clock-divider-inner':{
                fontSize:'5em' 
            },
            alignItems:'center',
            justifyContent:'center',
            fontFamily:'serif' 
        },
        fontFamily:'"Helvetica Neue", Helvetica, sans-serif',
        fontSize:'1rem',
        userSelect:'none',
        textAlign:'center',
        boxSizing:'border-box',
        alignItems:'flex-end' 
    },
    '@keyframes indexing':{
        '0%':{
            zIndex:'2' 
        },
        '1%':{
            zIndex:'3' 
        },
        '100%':{
            zIndex:'4' 
        } 
    },
    '@keyframes flip-bottom':{
        '0%':{
        },
        '100%':{
        } 
    },
    '@keyframes flip-top':{
        '0%':{
        },
        '100%':{
        } 
    },
    '@keyframes show-shadow':{
        '0%':{
        },
        '100%':{
        } 
    },
    '@keyframes hide-shadow':{
        '0%':{
        },
        '100%':{
        } 
    } 
};
    