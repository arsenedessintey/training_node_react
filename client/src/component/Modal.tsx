import { ReactNode } from 'react';
import './modal.css'
interface Props {
    toggle: () => void;
    validate: () => void;
    children: ReactNode | undefined;
}

const Modal = (props: Props) => {
    // For multiple modal error on submit
    const id = new Date().getTime().toString();

    const { toggle, children, validate } = props;

    return <div className="containerModal">
        <form id={id} onSubmit={validate}>
            <button type="button" onClick={toggle}>X</button>

            {children}

            <button form='modalFormId' type="button">Valider</button>
        </form>

    </div>
}

export default Modal;