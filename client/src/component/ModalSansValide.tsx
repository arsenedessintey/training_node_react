import { ReactNode } from 'react';
import './modal.css'
interface Props {
    toggle: () => void;
    children: ReactNode | undefined;
}

const ModalSansValide = (props: Props) => {
    // For multiple modal error on submit
    const id = new Date().getTime().toString();

    const { toggle, children } = props;

    return (
    <div className="containerModal">

            <br></br>
            <button className="ModalCroix" type="button" onClick={toggle}>✖</button>

            {children}
            <br></br>


    </div>
    )
}

export default ModalSansValide;