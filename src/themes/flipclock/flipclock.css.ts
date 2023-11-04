import { CSSProperties } from '../../helpers/css';

export const css: CSSProperties = {
    '.flip-clock': {
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '1rem',
        userSelect: 'none',
        textAlign: 'center',
        position: 'relative',
        width: '100%',
        display: 'inline-flex',
        boxSizing: 'border-box',
        alignItems: 'flex-end',
        gap: '.3333em',
        '.flip-clock-group': {
            display: 'flex',
            flexDirection: 'column',
            '+ .flip-clock-group': {
                marginLeft: '1rem' 
            },
            '.flip-clock-group-items': {
                display: 'flex',
                alignItems: 'stretch',
                gap: '.3333em' 
            },
            '.flip-clock-label': {
                marginBottom: '.5rem',
                '&.flip-clock-meridium': {
                    fontSize: '1.75em',
                    lineHeight: '1.75em',
                    top: '50%',
                    left: '100%',
                    flex: '0',
                    width: 'auto',
                    textTransform: 'uppercase',
                    fontWeight: '200',
                    transform: 'translate(.5em, -50%)' 
                } 
            } 
        },
        '.flip-clock-card': {
            width: '4em',
            height: '6em',
            position: 'relative',
            borderRadius: '.75rem',
            boxShadow: '0 1.5px 3px rgba(0, 0, 0, 0.24), 0 3px 8px rgba(0, 0, 0, 0.05)',
            fontWeight: 'bold',
            color: '#ccc',
            '&:not(.animate)': {
                '.active .flip-clock-card-item-inner': {
                    zIndex: '4' 
                },
                '.flip-clock-card-item-inner': {
                    '.top, .bottom': {
                        '&:after': {
                            display: 'none' 
                        } 
                    } 
                } 
            },
            '.flip-clock-card-item-inner': {
                position: 'absolute',
                width: '100%',
                height: '100%',
                '&:first-child': {
                    zIndex: '2' 
                },
                '.top, .bottom': {
                    width: '100%',
                    height: '50%',
                    overflow: 'hidden',
                    position: 'relative',
                    fontSize: '4.5em',
                    background: '#333',
                    boxShadow: 'inset 0 0 .2em rgba(0,0,0,.5)',
                    '&:after': {
                        content: '" "',
                        display: 'block',
                        position: 'absolute',
                        top: '0',
                        right: '0',
                        bottom: '0',
                        left: '0',
                        overflow: 'hidden' 
                    },
                    '&:before': {
                        content: '" "',
                        display: 'block',
                        width: '100%',
                        height: '1px',
                        position: 'absolute' 
                    } 
                },
                '.top': {
                    borderRadius: '.75rem .75rem 0 0',
                    lineHeight: 'calc(6em/4.5em)',
                    '&:after': {
                        borderRadius: '.75rem .75rem 0 0' 
                    },
                    '&:before': {
                        background: '#333',
                        opacity: '.4',
                        bottom: '0' 
                    } 
                },
                '.bottom': {
                    borderRadius: '0 0 .75rem .75rem',
                    lineHeight: '0',
                    '&:after': {
                        borderRadius: '0 0 .75rem .75rem' 
                    },
                    '&:before': {
                        background: '#ccc',
                        opacity: '.1' 
                    } 
                } 
            },
            '&.animate': {
                animationDuration: '80ms',
                animationDelay: '80ms',
                '.flip-clock-card-item-inner': {
                    perspective: '15em' 
                },
                '.top, .bottom, .active, .active > div, .before, .before > div': {
                    animationDelay: 'inherit',
                    animationFillMode: 'forwards',
                    animationDuration: 'inherit',
                    animationTimingFunction: 'inherit',
                    '&:after': {
                        animationDuration: 'inherit',
                        animationFillMode: 'inherit' 
                    } 
                },
                '.before': {
                    animationDelay: '0s',
                    animationTimingFunction: 'ease-in',
                    '.top': {
                        animationName: 'flip-top' 
                    },
                    '.top:after, .bottom:after': {
                        animationName: 'show-shadow' 
                    } 
                },
                '.active': {
                    animationTimingFunction: 'ease-out',
                    '& > div': {
                        animationName: 'indexing' 
                    },
                    '.top:after, .bottom:after': {
                        animationName: 'hide-shadow' 
                    },
                    '.bottom': {
                        animationName: 'flip-bottom' 
                    } 
                } 
            },
            '.active': {
                zIndex: '2',
                '.bottom': {
                    zIndex: '2',
                    transformOrigin: 'top center' 
                } 
            },
            '.before': {
                zIndex: '3',
                '.top': {
                    zIndex: '2',
                    transformOrigin: 'bottom center',
                    '&:after': {
                        background: 'linear-gradient(to bottom, rgba(0,0,0,.1) 0%, rgba(0,0,0,1) 100%)' 
                    } 
                },
                '.bottom': {
                    '&:after': {
                        background: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,.1) 100%)' 
                    } 
                } 
            } 
        },
        '.flip-clock-divider': {
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'serif',
            color: '#333',
            width: '1em',
            '.flip-clock-divider-inner': {
                fontSize: '5em' 
            } 
        } 
    },
    '@keyframes indexing': {
        '0%': {
            zIndex: '2' 
        },
        '1%': {
            zIndex: '3' 
        },
        '100%': {
            zIndex: '4' 
        } 
    },
    '@keyframes flip-bottom': {
        '0%': {
            transform: 'rotateX(90deg)' 
        },
        '100%': {
            transform: 'rotateX(0)' 
        } 
    },
    '@keyframes flip-top': {
        '0%': {
            transform: 'rotateX(0)' 
        },
        '100%': {
            transform: 'rotateX(-90deg)' 
        } 
    },
    '@keyframes show-shadow': {
        '0%': {
            opacity: '0' 
        },
        '100%': {
            opacity: '1' 
        } 
    },
    '@keyframes hide-shadow': {
        '0%': {
            opacity: '1' 
        },
        '100%': {
            opacity: '0' 
        } 
    } 
};
    