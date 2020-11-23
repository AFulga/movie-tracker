const { Box, Text } = require('@chakra-ui/react');
const { useRef, useEffect } = require('react');

const RatingCircle = ({
  score,
  scale = 'scale(1)',
  isLabelHidden,
  css = {},
}) => {
  const cv = useRef(null);
  const dim = 30;
  useEffect(() => {
    const canvas = cv.current;
    const ctx = canvas.getContext('2d');
    const start = Math.PI * 1.5;
    const end = start + (Math.PI * score * 2) / 10;
    const end2 = start + Math.PI * 2;

    const lineWidth = 5;

    ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    ctx.fillRect(0, 0, dim * 2, dim * 2);
    ctx.beginPath();
    ctx.arc(dim, dim, dim, 0, Math.PI * 2);
    ctx.fillStyle = '#081c22';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(dim, dim, dim - lineWidth, start, end);

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle =
      score >= 7 ? '#21d07a' : score >= 4 ? '#d2d531' : '#ba1f55';

    ctx.stroke();
    ctx.beginPath();
    ctx.arc(dim, dim, dim - lineWidth, end, end2);

    ctx.strokeStyle =
      score >= 7
        ? '#204529'
        : score >= 4
        ? '#423d0f'
        : score > 0
        ? '#571435'
        : '#666';
    ctx.stroke();
  }, [score]);
  return (
    <Box
      width='fit-content'
      d='flex'
      __css={{
        marginTop: '20px',
        marginBottom: '20px',
        transform: scale,
        ...css,
      }}
    >
      <Box className='cv-container'>
        <canvas id='rcCv' ref={cv} width={dim * 2} height={dim * 2}></canvas>
        <Box className='percent' width={`${dim * 2}px`} height={`${dim * 2}px`}>
          {score ? (
            <Text color='#fff'>
              {score * 10}
              <sup>%</sup>
            </Text>
          ) : (
            <Text color='#fff'>NR</Text>
          )}
        </Box>
      </Box>
      {!isLabelHidden && (
        <Text className='u-text' width={`${dim * 2 - 10}px`}>
          User Score
        </Text>
      )}
    </Box>
  );
};

export default RatingCircle;
