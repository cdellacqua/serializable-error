[serializable-error](../README.md) › [SerializableError](serializableerror.md)

# Class: SerializableError

The SerializableError class inherits the native Error class.
It provides a useful alternative that is JSON-serializable and add an optional "cause" object that can be passed to the constructor
to further detail the exception that occured in your code.

## Hierarchy

* [Error](serializableerror.md#static-error)

  ↳ **SerializableError**

## Index

### Constructors

* [constructor](serializableerror.md#constructor)

### Properties

* [cause](serializableerror.md#optional-cause)
* [message](serializableerror.md#message)
* [name](serializableerror.md#name)
* [stack](serializableerror.md#optional-stack)
* [Error](serializableerror.md#static-error)
* [maxDepth](serializableerror.md#static-maxdepth)

### Methods

* [toJSON](serializableerror.md#tojson)
* [toString](serializableerror.md#tostring)

## Constructors

###  constructor

\+ **new SerializableError**(`message?`: undefined | string, `cause?`: any): *[SerializableError](serializableerror.md)*

Instantiates a new SerializableError

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`message?` | undefined &#124; string | a message detailing the error that occured |
`cause?` | any | a cause for this error (for example, a previously catched error)  |

**Returns:** *[SerializableError](serializableerror.md)*

## Properties

### `Optional` cause

• **cause**? : *any*

A cause for this Error

___

###  message

• **message**: *string*

*Inherited from [SerializableError](serializableerror.md).[message](serializableerror.md#message)*

___

###  name

• **name**: *string*

*Inherited from [SerializableError](serializableerror.md).[name](serializableerror.md#name)*

___

### `Optional` stack

• **stack**? : *undefined | string*

*Inherited from [SerializableError](serializableerror.md).[stack](serializableerror.md#optional-stack)*

___

### `Static` Error

▪ **Error**: *ErrorConstructor*

___

### `Static` maxDepth

▪ **maxDepth**: *number* = 256

Maximum serialization depth for nested objects

## Methods

###  toJSON

▸ **toJSON**(): *Record‹string, any›*

Serializes this instance.
If the cause contains nested objects, they get recursively serialized
until the maxDepth is reached

**Returns:** *Record‹string, any›*

___

###  toString

▸ **toString**(): *string*

Returns a string containing the JSON representation of the current instance

**Returns:** *string*
