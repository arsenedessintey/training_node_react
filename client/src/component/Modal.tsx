import { ReactNode } from 'react';
import './modal.css'
interface Props {
    toggle: () => void;
    handleSubmit: (e: any) => void;
    children: ReactNode | undefined;
}

const Modal = (props: Props) => {
    // For multiple modal error on submit
    const id = new Date().getTime().toString();

    const { toggle, children, handleSubmit } = props;

    return <div className="containerModal">
        <form id={id} onSubmit={handleSubmit}>
            <button type="button" onClick={toggle}>X</button>

            {children}

            <button form={id} type="submit">Valider</button>
        </form>

    </div>
}

export default Modal;