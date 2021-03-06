import Modal from "react-modal";
import { Container, RadioBox, TransactionTypeContainer } from "./styles";

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import closeImg from '../../assets/close.svg';
import { FormEvent, useContext, useState } from "react";
import { api } from "../../services/api";
import { useTransactions } from "../../hooks/useTransactions";

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose } : NewTransactionModalProps) {
    const [type, setType] = useState('deposit');  
    const [title, setTitle] = useState('');
    const [value, setValue] = useState(0);
    const [category, setCategory] = useState('');

    const {createTransaction} = useTransactions();

    async function handleCreateNewTransaction(event: FormEvent) {
      event.preventDefault();
      await createTransaction({
        amount: value, 
        category,
        title,
        type
      })

      setTitle('');
      setValue(0);
      setCategory('');
      setType('deposit');
      onRequestClose();
    }

    return (
        <Modal 
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          overlayClassName="react-modal-overlay"
          className="react-modal-content"
        >
        <button 
            type="button"
            onClick={onRequestClose}
            className="react-modal-close"
        >
            <img 
                src={closeImg} 
                alt="Fechar modal"
            />
        </button>
        <Container>
          <h2>Cadastrar transação</h2>

          <input 
            placeholder="Título"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
          
          <input 
            type="number"
            placeholder="Valor"
            value={value}
            onChange={e => setValue(Number(e.target.value))}
          />

          <TransactionTypeContainer>
          <RadioBox 
            type="button"            
            onClick={() => setType('deposit')}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada"/>
            <span>Entrada</span>
          </RadioBox>
          <RadioBox 
            type="button"
            onClick={() => setType('withdraw')} 
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída"/>
            <span>Saída</span>
          </RadioBox>
          </TransactionTypeContainer>

          <input 
            placeholder="Categoria"
            value={category}
            onChange={event => setCategory(event.target.value)}
          />

          <button 
            type="submit"
            onClick={handleCreateNewTransaction}
          >
              Cadastrar
          </button>
        </Container>

      </Modal>
    )
}