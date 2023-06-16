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
            <br></br>
            <button className="ModalCroix" type="button" onClick={toggle}>✖</button>

            {children}
            <br></br>
            <button className="ModalButton" form={id} type="submit">Valider</button>
            <br></br>
            <br></br>
        </form>

    </div>
}

export default Modal;