import { useMemo } from 'react';
import { animated, useTransition } from 'react-spring';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    dialogMessage: ({ multiplier }) => ({
        fontFamily: '"Press Start 2P"',
        fontSize: `${6 * multiplier}px`,
        textTransform: 'uppercase',
    }),
}));

/**
 * Component hiển thị tin nhắn với hiệu ứng gõ từng ký tự.
 * Sử dụng react-spring để tạo animation mượt mà.
 * @param {string} message - Nội dung tin nhắn
 * @param {number} trail - Độ trễ giữa các ký tự (ms)
 * @param {number} multiplier - Hệ số phóng to
 * @param {Function} onMessageEnded - Callback khi kết thúc hiệu ứng
 * @param {boolean} forceShowFullMessage - Bỏ qua hiệu ứng, hiển thị toàn bộ
 */
const Message = ({
    message = [],
    trail = 35,
    multiplier = 1,
    onMessageEnded = () => {},
    forceShowFullMessage = false,
}) => {
    const classes = useStyles({ multiplier });
    /**
     * Chuyển đổi chuỗi thành mảng ký tự để tạo hiệu ứng gõ.
     */
    const items = useMemo(
        () => message.trim().split('').map((letter, index) => ({
            item: letter,
            key: index,
        })),
        [message]
    );

    const transitions = useTransition(items, {
        trail,
        from: { display: 'none' },
        enter: { display: '' },
        onRest: (status, controller, item) => {
            if (item.key === items.length - 1) {
                onMessageEnded();
            }
        },
    });

    return (
        <div className={classes.dialogMessage}>
            {forceShowFullMessage && (
                <span>{message}</span>
            )}

            {!forceShowFullMessage && transitions((styles, { item, key }) => (
                <animated.span key={key} style={styles}>
                    {item}
                </animated.span>
            ))}
        </div>
    );
};

export default Message;
